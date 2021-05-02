package repository

import (
	"context"
	"speaking-exam/server/domain/object"
)

type Exam interface {
	FindById(ctx context.Context, id int64) (*object.Exam, error)
}
