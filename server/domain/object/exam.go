package object

import "time"

type Exam struct {
	Id        int64
	Name      string
	CreatedAt time.Time `gorm:"type:datetime()"`
	UpdatedAt time.Time `gorm:"type:datetime()"`
}
