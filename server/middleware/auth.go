package middleware

import (
	"context"
	"speaking-exam/server/dao"
	"speaking-exam/server/domain/object"

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

func AuthAdmin(ctx context.Context) (context.Context, error) {
	// ユーザ情報を取得
	userId := ctx.Value("userId").(int64)
	user := new(object.User)
	user.Id = userId
	dao, err := dao.New()
	if err != nil {
		return nil, err
	}
	ctx, err = dao.Auth().ValidateAdmin(ctx, user)
	if err != nil {
		return nil, err
	}
	return ctx, nil
}
