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

func (r *user) GetCurrentUser(ctx context.Context) (*object.User, error) {
	userId := ctx.Value("userId").(int64)
	user := new(object.User)
	user.Id = userId
	result := r.db.Where(user).First(&user)
	if result.Error != nil {
		return nil, result.Error
	}
	return user, nil
}

func (r *user) CreateUsers(ctx context.Context, loginIds []string, passwords []string, examIds []int64) ([]*object.User, error) {
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
		user.ExamId = examIds[index]
		users = append(users, user)
		res = append(res, user)
	}
	// Insert to db
	err := gormbulk.BulkInsert(r.db, users, 3000)
	return res, err
}

func (r *user) ListUsers(ctx context.Context) ([]*object.User, error) {
	// Create user list
	users := new([]*object.User)
	result := r.db.Table("users").Select("users.*, tasks.type 'done_task_type'").Joins("left join tasks on tasks.id = users.done_task_id").Scan(&users)
	if result.Error != nil {
		return nil, result.Error
	}
	return *users, nil
}

func (r *user) UpdateUser(ctx context.Context, userId int64, loginId string, password string, userType int64, examId int64, doneTaskId int64) (*object.User, error) {
	// Get user data from userId
	user := new(object.User)
	user.Id = userId
	result := r.db.Where(user).First(&user)
	if result.Error != nil {
		return nil, result.Error
	}
	// アップデート用のユーザを作成
	userUpdated := new(object.User)
	if loginId != "" {
		userUpdated.LoginId = loginId
	}
	if password != "" {
		userUpdated.SetPassword(password)
	}
	if userType != 0 {
		userUpdated.Type = userType
	}
	if examId != 0 {
		userUpdated.ExamId = examId
	}
	if doneTaskId != 0 {
		userUpdated.DoneTaskId = doneTaskId
	}
	// アップデート実行
	result = r.db.Model(&user).Update(&userUpdated)
	if result.Error != nil {
		return nil, result.Error
	}
	return user, nil
}

func (r *user) UpdateDoneTaskId(ctx context.Context, doneTaskId int64) (*object.User, error) {
	// Get user data
	user, err := r.GetCurrentUser(ctx)
	if err != nil {
		return nil, err
	}
	// アップデート用ユーザ作成。doneタスクIDは小さいものには変更できない。
	userUpdated := new(object.User)
	if doneTaskId > user.DoneTaskId {
		userUpdated.DoneTaskId = doneTaskId
	}
	result := r.db.Model(&user).Update(&userUpdated)
	if result.Error != nil {
		return nil, result.Error
	}
	return user, nil
}
