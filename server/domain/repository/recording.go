package repository

import (
	"context"
	"speaking-exam/server/domain/object"
)

type Recording interface {
	CreateRecording(ctx context.Context, taskId int64, audioData []byte) (*object.Recording, error)
	ListRecordings(ctx context.Context) ([]*object.Recording, error)
}
