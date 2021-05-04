package dao

import (
	"context"
	"speaking-exam/server/domain/object"
	"speaking-exam/server/domain/repository"

	"github.com/jinzhu/gorm"
)

type (
	task struct {
		db *gorm.DB
	}
)

func NewTask(db *gorm.DB) repository.Task {
	return &task{db: db}
}

func (r *task) ListTasks(ctx context.Context, examId int64, typeInt int32) ([]*object.Task, error) {
	tasks := new([]*object.Task)
	result := r.db.Find(tasks, "exam_id=? and type=?", examId, typeInt)
	if result.Error != nil {
		return nil, result.Error
	}
	return *tasks, nil
}
