package object

import (
	"time"
)

type Task struct {
	Id               int64
	ExamId           int64
	Type             TaskType
	TextObjKey       string
	TextUrl          string
	ImageObjKey      string
	ImageUrl         string
	AudioObjKey      string
	AudioUrl         string
	MsBeforeStarting int64
	MsPreparing      int64
	MsRecording      int64
	CreatedAt        time.Time `gorm:"type:datetime()"`
	UpdatedAt        time.Time `gorm:"type:datetime()"`
}
