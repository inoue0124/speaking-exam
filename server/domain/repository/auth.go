package repository

import (
	"context"
)

type Auth interface {
	GetToken(ctx context.Context, id int64) (*string, error)
}
