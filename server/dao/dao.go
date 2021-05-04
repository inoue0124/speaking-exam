package dao

import (
	"speaking-exam/server/domain/repository"

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
	}
)

func New() (Dao, error) {
	db, err := initDb()
	if err != nil {
		return nil, err
	}
	return &dao{db: db}, nil
}

func (d *dao) Auth() repository.Auth {
	return NewAuth()
}

func (d *dao) User() repository.User {
	return NewUser(d.db)
}

func (d *dao) Task() repository.Task {
	return NewTask(d.db)
}

func (d *dao) Recording() repository.Recording {
	return NewRecording(d.db)
}
