package dao

import (
	"context"
	"os"
	"speaking-exam/server/domain/repository"
	"time"

	jwt "github.com/form3tech-oss/jwt-go"
)

type (
	auth struct{}
)

func NewAuth() repository.Auth {
	return &auth{}
}

func (r *auth) GetToken(ctx context.Context, id int64) (*string, error) {
	// headerのセット
	token := jwt.New(jwt.SigningMethodHS256)

	// claimsのセット
	claims := token.Claims.(jwt.MapClaims)
	claims["sub"] = id
	claims["iat"] = time.Now()
	claims["exp"] = time.Now().Add(time.Hour * 24).Unix()

	// 電子署名
	tokenString, err := token.SignedString([]byte(os.Getenv("SIGNINGKEY")))
	if err != nil {
		return nil, err
	}

	// JWTを返却
	return &tokenString, nil
}
