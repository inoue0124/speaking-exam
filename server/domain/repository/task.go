package repository

import (
	"context"
	"speaking-exam/server/domain/object"
)

type Task interface {
	ListTasks(ctx context.Context, examId int64, typeInt int32) ([]*object.Task, error)
	GetTask(ctx context.Context, id int64) (*object.Task, error)
}
