package repository

import (
	"context"
	"speaking-exam/server/domain/object"
)

type User interface {
	FindById(ctx context.Context, id int64) (*object.User, error)
}
