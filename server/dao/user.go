package dao

import (
	"context"
	"speaking-exam/server/domain/object"
	"speaking-exam/server/domain/repository"

	"github.com/jinzhu/gorm"
)

type (
	user struct {
		db *gorm.DB
	}
)

func NewUser(db *gorm.DB) repository.User {
	return &user{db: db}
}

func (r *user) FindById(ctx context.Context, id int64) (*object.User, error) {
	user := new(object.User)
	result := r.db.First(&user, id)
	if result.Error != nil {
		return nil, result.Error
	}
	return user, nil
}
