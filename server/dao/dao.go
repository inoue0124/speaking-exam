package dao

import (
	"speaking-exam/server/domain/repository"

	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"github.com/jinzhu/gorm"
)

type (
	Dao interface {
		Auth() repository.Auth
		User() repository.User
		Task() repository.Task
		Exam() repository.Exam
		Recording() repository.Recording
	}

	dao struct {
		db           *gorm.DB
		s3Downloader *s3.S3
		s3Uploader   *s3manager.Uploader
	}
)

func New() (Dao, error) {
	db, err := initDb()
	if err != nil {
		return nil, err
	}
	s3Downloader := getDownloader()
	s3Uploader := getUploader()
	return &dao{db: db, s3Downloader: s3Downloader, s3Uploader: s3Uploader}, nil
}

func (d *dao) Auth() repository.Auth {
	return NewAuth()
}

func (d *dao) User() repository.User {
	return NewUser(d.db)
}

func (d *dao) Task() repository.Task {
	return NewTask(d.db, d.s3Downloader)
}

func (d *dao) Exam() repository.Exam {
	return NewExam(d.db)
}

func (d *dao) Recording() repository.Recording {
	return NewRecording(d.db, d.s3Uploader)
}
