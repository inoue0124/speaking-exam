package dao

import (
	"fmt"
	"log"
	"os"
	"time"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

func initDb() (*gorm.DB, error) {
	DBMS := "mysql"
	USER := getEnvStr("MYSQL_USER")
	PASS := getEnvStr("MYSQL_PASSWORD")
	HOST := getEnvStr("MYSQL_HOST")
	PORT := getEnvStr("MYSQL_PORT")
	PROTOCOL := fmt.Sprintf("tcp(%s:%s)", HOST, PORT)
	DBNAME := getEnvStr("MYSQL_DATABASE")
	CONNECT := USER + ":" + PASS + "@" + PROTOCOL + "/" + DBNAME + "?parseTime=true"
	db, err := gorm.Open(DBMS, CONNECT)
	if err != nil {
		return nil, err
	}
	db.DB().SetMaxOpenConns(50)
	db.DB().SetMaxIdleConns(10)
	db.DB().SetConnMaxLifetime(10 * time.Second)
	return db, nil
}

func getEnvStr(key string) string {
	v := os.Getenv(key)
	if v == "" {
		log.Fatalf("config:[%s] not found", key)
	}
	return v
}
