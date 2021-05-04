package dao

import (
	"speaking-exam/server/domain/repository"

	"github.com/jinzhu/gorm"
)

type (
	Dao interface {
		User() repository.User
		Auth() repository.Auth
	}

	dao struct {
		db *gorm.DB
	}
)

func New() (Dao, error) {
	db, err := initDb()
	if err != nil {
		return nil, err
	}
	return &dao{db: db}, nil
}

func (d *dao) User() repository.User {
	return NewUser(d.db)
}

func (d *dao) Auth() repository.Auth {
	return NewAuth()
}
