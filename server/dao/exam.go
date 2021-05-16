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

func (r *exam) ListExams(ctx context.Context) ([]*object.Exam, error) {
	// Create exam list
	exams := new([]*object.Exam)
	result := r.db.Find(exams)
	if result.Error != nil {
		return nil, result.Error
	}
	return *exams, nil
}
