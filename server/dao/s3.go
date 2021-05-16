package dao

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

func getS3() *s3.S3 {
	REGION := getEnvStr("AWS_REGION")
	sess := session.Must(session.NewSession(&aws.Config{Region: aws.String(REGION)}))
	s3 := s3.New(sess)
	return s3
}

func getUploader() *s3manager.Uploader {
	REGION := getEnvStr("AWS_REGION")
	sess := session.Must(session.NewSession(&aws.Config{Region: aws.String(REGION)}))
	uploader := s3manager.NewUploader(sess)
	return uploader
}

func getDownloader() *s3manager.Downloader {
	REGION := getEnvStr("AWS_REGION")
	sess := session.Must(session.NewSession(&aws.Config{Region: aws.String(REGION)}))
	downloader := s3manager.NewDownloader(sess)
	return downloader
}
