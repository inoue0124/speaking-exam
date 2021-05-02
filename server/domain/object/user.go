package object

import "time"

type User struct {
	Id           int64
	LoginId      string
	PasswordHash string
	Type         int64
	ExamId       int64
	CreatedAt    time.Time `gorm:"type:datetime()"`
	UpdatedAt    time.Time `gorm:"type:datetime()"`
}
