package middleware

import (
	"context"
	"speaking-exam/server/dao"

	grpc_auth "github.com/grpc-ecosystem/go-grpc-middleware/auth"
)

func AuthFunc(ctx context.Context) (context.Context, error) {
	token, err := grpc_auth.AuthFromMD(ctx, "bearer")
	if err != nil {
		return nil, err
	}
	dao, err := dao.New()
	if err != nil {
		return nil, err
	}
	ctx, err = dao.Auth().ValidateToken(ctx, token)
	if err != nil {
		return nil, err
	}
	return ctx, nil
}
