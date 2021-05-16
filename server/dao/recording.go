package dao

import (
	"archive/zip"
	"bytes"
	"context"
	"fmt"
	"io"
	"os"
	"speaking-exam/server/domain/object"
	"speaking-exam/server/domain/repository"
	"strings"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"github.com/jinzhu/gorm"
	"golang.org/x/sync/errgroup"
)

type (
	recording struct {
		db           *gorm.DB
		s3Downloader *s3manager.Downloader
		s3Uploader   *s3manager.Uploader
	}
)

func NewRecording(db *gorm.DB, s3Downloader *s3manager.Downloader, s3Uploader *s3manager.Uploader) repository.Recording {
	return &recording{db: db, s3Downloader: s3Downloader, s3Uploader: s3Uploader}
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
	// タスク情報を取得
	task := new(object.Task)
	task.Id = taskId
	result = r.db.Where(task).First(&task)
	if result.Error != nil {
		return nil, result.Error
	}
	// recordingデータを作成
	recording := new(object.Recording)
	recording.UserId = userId
	recording.TaskId = taskId
	// キー名 record/U0001/U0001_T001_reading_210516101612.webm
	recording.AudioObjKey = "record/U" +
		fmt.Sprintf("%04d", userId) +
		"/U" +
		fmt.Sprintf("%04d", userId) +
		"_T" +
		fmt.Sprintf("%03d", taskId) +
		"_" +
		object.TaskType(task.Type).ToString() +
		"_" +
		time.Now().Format("060102150405") +
		".webm"
	// ファイルをアップロード
	if _, err := r.s3Uploader.Upload(&s3manager.UploadInput{
		Bucket:      aws.String(getEnvStr("AWS_S3_BUCKET")),
		Key:         aws.String(recording.AudioObjKey),
		Body:        bytes.NewReader(audioData),
		ContentType: aws.String("audio/webm"),
	}); err != nil {
		return nil, err
	}
	if result := r.db.Create(&recording); result.Error != nil {
		return nil, result.Error
	}
	return recording, nil
}

func (r *recording) ListRecordings(ctx context.Context) ([]*object.Recording, error) {
	// Create user list
	recordings := new([]*object.Recording)
	result := r.db.Find(recordings)
	if result.Error != nil {
		return nil, result.Error
	}
	return *recordings, nil
}

func (r *recording) DownloadRecordings(audioObjKeys []string) error {
	eg := errgroup.Group{}

	for _, audioObjKey := range audioObjKeys {
		eg.Go(func() error {
			err := r.download(audioObjKey)
			return err
		})
	}
	if err := eg.Wait(); err != nil {
		return err
	}
	return nil
}

func (r *recording) download(audioObjKey string) error {
	// ダウンロード領域を作成
	splited := strings.Split(audioObjKey, "/")
	os.MkdirAll("/"+strings.Join(splited[:len(splited)-1], "/"), 0755)
	file, _ := os.Create("/" + audioObjKey)
	defer file.Close()

	// download実行
	_, err := r.s3Downloader.Download(file, &s3.GetObjectInput{
		Bucket: aws.String(getEnvStr("AWS_S3_BUCKET")),
		Key:    aws.String(audioObjKey),
	})
	return err
}

func (r *recording) ArchiveRecordings(audioObjKeys []string) error {
	zipFile, err := os.Create("/record/record.zip")
	if err != nil {
		return err
	}
	zipWriter := zip.NewWriter(zipFile)
	defer zipWriter.Close()
	for _, audioObjKey := range audioObjKeys {
		// ファイルを開く
		file, err := os.Open("/" + audioObjKey)
		if err != nil {
			return err
		}
		defer file.Close()
		// zipディレクトリのファイルを作成
		writer, err := zipWriter.Create("/" + audioObjKey)
		if err != nil {
			return err
		}
		// zipディレクトリにコピー
		_, err = io.Copy(writer, file)
		if err != nil {
			return err
		}
	}
	return nil
}
