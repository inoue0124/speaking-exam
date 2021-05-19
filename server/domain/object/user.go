package object

import (
	"fmt"
	"time"

	"github.com/pkg/errors"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	Id           int64
	LoginId      string
	PasswordHash string
	Type         int64
	ExamId       int64
	DoneTaskId   int64
	CreatedAt    time.Time `gorm:"type:datetime()"`
	UpdatedAt    time.Time `gorm:"type:datetime()"`
}

func (u *User) CheckPassword(pass string) bool {
	return bcrypt.CompareHashAndPassword([]byte(u.PasswordHash), []byte(pass)) == nil
}

func (u *User) SetPassword(pass string) error {
	passwordHash, err := generatePasswordHash(pass)
	if err != nil {
		return fmt.Errorf("generate error: %w", err)
	}
	u.PasswordHash = passwordHash
	return nil
}

func generatePasswordHash(pass string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(pass), bcrypt.DefaultCost)
	if err != nil {
		return "", fmt.Errorf("hashing password failed: %w", errors.WithStack(err))
	}
	return string(hash), nil
}
