package repository

import (
	"context"
	"speaking-exam/server/domain/object"
)

type User interface {
	Login(ctx context.Context, loginId string, password string) (*object.User, error)
	GetCurrentUser(ctx context.Context) (*object.User, error)
	CreateUsers(ctx context.Context, loginIds []string, passwords []string, examId int64) ([]*object.User, error)
}
