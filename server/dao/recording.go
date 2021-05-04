package dao

import (
	"context"
	"speaking-exam/server/domain/object"
	"speaking-exam/server/domain/repository"

	"github.com/jinzhu/gorm"
)

type (
	recording struct {
		db *gorm.DB
	}
)

func NewRecording(db *gorm.DB) repository.Recording {
	return &recording{db: db}
}

func (r *recording) CreateRecording(ctx context.Context, taskId int64, audioData []byte) (*object.Recording, error) {
	userId := ctx.Value("userId").(int64)
	recording := new(object.Recording)
	recording.UserId = userId
	recording.TaskId = taskId
	// TODO: Implement uploading audio
	recording.AudioObjKey = "unimplemented"
	if result := r.db.Create(&recording); result.Error != nil {
		return nil, result.Error
	}
	return recording, nil
}
