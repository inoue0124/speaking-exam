package repository

import (
	"context"
	"speaking-exam/server/domain/object"
)

type Exam interface {
	ListExams(ctx context.Context) ([]*object.Exam, error)
}
