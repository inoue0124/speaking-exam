package dao

import (
	"context"
	"speaking-exam/server/domain/object"
	"speaking-exam/server/domain/repository"

	"github.com/jinzhu/gorm"
)

type (
	exam struct {
		db *gorm.DB
	}
)

func NewExam(db *gorm.DB) repository.Exam {
	return &exam{db: db}
}

func (r *exam) FindById(ctx context.Context, id int64) (*object.Exam, error) {
	exam := new(object.Exam)
	result := r.db.First(&exam, id)
	if result.Error != nil {
		return nil, result.Error
	}
	return exam, nil
}
