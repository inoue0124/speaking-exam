package dao

import (
	"bytes"
	"context"
	"speaking-exam/server/domain/object"
	"speaking-exam/server/domain/repository"
	"strconv"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"github.com/jinzhu/gorm"
)

type (
	recording struct {
		db *gorm.DB
		s3 *s3manager.Uploader
	}
)

func NewRecording(db *gorm.DB, s3 *s3manager.Uploader) repository.Recording {
	return &recording{db: db, s3: s3}
}

func (r *recording) CreateRecording(ctx context.Context, taskId int64, audioData []byte) (*object.Recording, error) {
	// ユーザ情報を取得
	userId := ctx.Value("userId").(int64)
	user := new(object.User)
	user.Id = userId
	result := r.db.Where(user).First(&user)
	if result.Error != nil {
		return nil, result.Error
	}
	// recordingデータを作成
	recording := new(object.Recording)
	recording.UserId = userId
	recording.TaskId = taskId
	recording.AudioObjKey = "record/" + user.LoginId + "/" + strconv.FormatInt(taskId, 10) + ".webm"
	// ファイルをアップロード
	if _, err := r.s3.Upload(&s3manager.UploadInput{
		Bucket: aws.String(getEnvStr("AWS_S3_BUCKET")),
		Key:    aws.String(recording.AudioObjKey),
		Body:   bytes.NewReader(audioData),
	}); err != nil {
		return nil, err
	}
	if result := r.db.Create(&recording); result.Error != nil {
		return nil, result.Error
	}
	return recording, nil
}
