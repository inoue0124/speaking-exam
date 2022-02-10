package dao

import (
	"context"
	"speaking-exam/server/domain/object"
	"speaking-exam/server/domain/repository"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/jinzhu/gorm"
)

type (
	task struct {
		db *gorm.DB
		s3 *s3.S3
	}
)

func NewTask(db *gorm.DB, s3 *s3.S3) repository.Task {
	return &task{db: db, s3: s3}
}

func (r *task) ListTasks(ctx context.Context, examId int64, typeInt int32) ([]*object.Task, error) {
	// ユーザ情報を取得
	userId := ctx.Value("userId").(int64)
	user := new(object.User)
	user.Id = userId
	result := r.db.Where(user).First(&user)
	if result.Error != nil {
		return nil, result.Error
	}
	// タスク一覧を取得
	tasks := new([]*object.Task)
	result = r.db.Find(tasks, "exam_id=? and type=?", examId, typeInt)
	if result.Error != nil {
		return nil, result.Error
	}
	// objectkeyからpresigned urlに変換する
	for _, task := range *tasks {
		if task.TextObjKey != "" {
			req, _ := r.s3.GetObjectRequest(&s3.GetObjectInput{
				Bucket: aws.String(getEnvStr("AWS_S3_BUCKET")),
				Key:    aws.String(task.TextObjKey),
			})
			if urlStr, err := req.Presign(15 * time.Minute); err == nil {
				task.TextUrl = urlStr
			}
		}
		if task.ImageObjKey != "" {
			req, _ := r.s3.GetObjectRequest(&s3.GetObjectInput{
				Bucket: aws.String(getEnvStr("AWS_S3_BUCKET")),
				Key:    aws.String(task.ImageObjKey),
			})
			if urlStr, err := req.Presign(15 * time.Minute); err == nil {
				task.ImageUrl = urlStr
			}
		}
		if task.AudioObjKey != "" {
			req, _ := r.s3.GetObjectRequest(&s3.GetObjectInput{
				Bucket: aws.String(getEnvStr("AWS_S3_BUCKET")),
				Key:    aws.String(task.AudioObjKey),
			})
			if urlStr, err := req.Presign(15 * time.Minute); err == nil {
				task.AudioUrl = urlStr
			}
		}
	}
	return *tasks, nil
}

func (r *task) GetTask(ctx context.Context, id int64) (*object.Task, error) {
	// タスクを取得
	task := new(object.Task)
	task.Id = id
	result := r.db.Find(task)
	if result.Error != nil {
		return nil, result.Error
	}
	// objectkeyからpresigned urlに変換する
	if task.TextObjKey != "" {
		req, _ := r.s3.GetObjectRequest(&s3.GetObjectInput{
			Bucket: aws.String(getEnvStr("AWS_S3_BUCKET")),
			Key:    aws.String(task.TextObjKey),
		})
		if urlStr, err := req.Presign(15 * time.Minute); err == nil {
			task.TextUrl = urlStr
		}
	}
	if task.ImageObjKey != "" {
		req, _ := r.s3.GetObjectRequest(&s3.GetObjectInput{
			Bucket: aws.String(getEnvStr("AWS_S3_BUCKET")),
			Key:    aws.String(task.ImageObjKey),
		})
		if urlStr, err := req.Presign(15 * time.Minute); err == nil {
			task.ImageUrl = urlStr
		}
	}
	if task.AudioObjKey != "" {
		req, _ := r.s3.GetObjectRequest(&s3.GetObjectInput{
			Bucket: aws.String(getEnvStr("AWS_S3_BUCKET")),
			Key:    aws.String(task.AudioObjKey),
		})
		if urlStr, err := req.Presign(15 * time.Minute); err == nil {
			task.AudioUrl = urlStr
		}
	}
	return task, nil
}
