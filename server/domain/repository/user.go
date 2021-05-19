package repository

import (
	"context"
	"speaking-exam/server/domain/object"
)

type User interface {
	Login(ctx context.Context, loginId string, password string) (*object.User, error)
	GetCurrentUser(ctx context.Context) (*object.User, error)
	CreateUsers(ctx context.Context, loginIds []string, passwords []string, examIds []int64) ([]*object.User, error)
	ListUsers(ctx context.Context) ([]*object.User, error)
	UpdateUser(ctx context.Context, userId int64, loginId string, password string, userType int64, examId int64, doneTaskId int64) (*object.User, error)
	UpdateDoneTaskId(ctx context.Context, doneTaskId int64) (*object.User, error)
}
