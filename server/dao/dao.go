package dao

import (
	"speaking-exam/server/domain/repository"

	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/jinzhu/gorm"
)

type (
	Dao interface {
		Auth() repository.Auth
		User() repository.User
		Task() repository.Task
		Recording() repository.Recording
	}

	dao struct {
		db *gorm.DB
		s3 *s3.S3
	}
)

func New() (Dao, error) {
	db, err := initDb()
	if err != nil {
		return nil, err
	}
	s3 := initS3()
	return &dao{db: db, s3: s3}, nil
}

func (d *dao) Auth() repository.Auth {
	return NewAuth()
}

func (d *dao) User() repository.User {
	return NewUser(d.db)
}

func (d *dao) Task() repository.Task {
	return NewTask(d.db, d.s3)
}

func (d *dao) Recording() repository.Recording {
	return NewRecording(d.db)
}
