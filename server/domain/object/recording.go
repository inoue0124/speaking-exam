package object

import (
	"time"
)

type Recording struct {
	Id          int64
	UserId      int64
	TaskId      int64
	AudioObjKey string
	CreatedAt   time.Time `gorm:"type:datetime()"`
	UpdatedAt   time.Time `gorm:"type:datetime()"`
}
