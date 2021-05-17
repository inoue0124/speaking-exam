package repository

import (
	"context"
	"speaking-exam/server/domain/object"
)

type Auth interface {
	GetToken(ctx context.Context, id int64) (*string, error)
	ValidateToken(ctx context.Context, signedString string) (context.Context, error)
	ValidateAdmin(ctx context.Context, user *object.User) (context.Context, error)
}
