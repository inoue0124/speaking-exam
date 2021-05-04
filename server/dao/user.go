package dao

import (
	"context"
	"fmt"
	"speaking-exam/server/domain/object"
	"speaking-exam/server/domain/repository"

	"github.com/jinzhu/gorm"
	gormbulk "github.com/t-tiger/gorm-bulk-insert/v2"
)

type (
	user struct {
		db *gorm.DB
	}
)

func NewUser(db *gorm.DB) repository.User {
	return &user{db: db}
}

func (r *user) Login(ctx context.Context, loginId string, password string) (*object.User, error) {
	// Get user data from loginId
	user := new(object.User)
	user.LoginId = loginId
	result := r.db.Where(user).First(&user)
	if result.Error != nil {
		return nil, result.Error
	}
	// Validate password
	if user.CheckPassword(password) {
		return user, nil
	} else {
		return nil, fmt.Errorf("the password is not correct")
	}
}

func (r *user) CreateUsers(ctx context.Context, loginIds []string, passwords []string, examId int64) ([]*object.User, error) {
	// Validate input
	if len(loginIds) != len(passwords) {
		return nil, fmt.Errorf("the lengths of loginIds and passwords are not correct")
	}
	// Create user list
	var users []interface{}
	var res []*object.User
	for index, loginId := range loginIds {
		user := new(object.User)
		user.LoginId = loginId
		user.SetPassword(passwords[index])
		user.Type = 1
		user.ExamId = examId
		users = append(users, user)
		res = append(res, user)
	}
	// Insert to db
	gormbulk.BulkInsert(r.db, users, 3000)
	return res, nil
}
