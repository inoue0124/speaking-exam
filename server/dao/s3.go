package dao

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

func initS3() *s3.S3 {
	REGION := getEnvStr("AWS_REGION")
	sess := session.Must(session.NewSession(&aws.Config{Region: aws.String(REGION)}))
	svc := s3.New(sess)
	return svc
}
