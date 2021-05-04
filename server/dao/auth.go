package dao

import (
	"context"
	"fmt"
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

func (r *auth) ValidateToken(ctx context.Context, signedString string) (context.Context, error) {
	token, err := jwt.Parse(signedString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return "", fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(os.Getenv("SIGNINGKEY")), nil
	})

	if err != nil {
		if ve, ok := err.(*jwt.ValidationError); ok {
			if ve.Errors&jwt.ValidationErrorExpired != 0 {
				return nil, fmt.Errorf("%s is expired", signedString)
			} else {
				return nil, fmt.Errorf("%s is invalid", signedString)
			}
		} else {
			return nil, fmt.Errorf("%s is invalid", signedString)
		}
	}

	if token == nil {
		return nil, fmt.Errorf("not found token in %s:", signedString)
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return nil, fmt.Errorf("not found claims in %s", signedString)
	}
	userId, ok := claims["sub"].(float64)
	if !ok {
		return nil, fmt.Errorf("not found %s in %s", "sub", signedString)
	}
	context.WithValue(ctx, "userId", int64(userId))

	return ctx, nil
}
