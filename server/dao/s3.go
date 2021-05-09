package dao

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

func getDownloader() *s3.S3 {
	REGION := getEnvStr("AWS_REGION")
	sess := session.Must(session.NewSession(&aws.Config{Region: aws.String(REGION)}))
	downloader := s3.New(sess)
	return downloader
}

func getUploader() *s3manager.Uploader {
	REGION := getEnvStr("AWS_REGION")
	sess := session.Must(session.NewSession(&aws.Config{Region: aws.String(REGION)}))
	uploader := s3manager.NewUploader(sess)
	return uploader
}
