package dao

import (
	"speaking-exam/server/domain/repository"

	"github.com/jinzhu/gorm"
)

type (
	Dao interface {
		Exam() repository.Exam
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

func (d *dao) Exam() repository.Exam {
	return NewExam(d.db)
}
