package dao

import (
	"fmt"
	"log"
	"os"

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
	return db, nil
}

func getEnvStr(key string) string {
	v := os.Getenv(key)
	if v == "" {
		log.Fatalf("config:[%s] not found", key)
	}
	return v
}
