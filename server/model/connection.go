package model

import (
	"fmt"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
)

type Config struct {
	User     string
	Password string
	Host     string
	Port     string
	DBName   string
}

var defaultConfig = Config{
	User:     os.Getenv("DB_USER"),
	Password: os.Getenv("DB_PASSWORD"),
	Host:     os.Getenv("DB_HOST"),
	Port:     os.Getenv("DB_PORT"),
	DBName:   os.Getenv("DB_NAME"),
}

func SetupDB() (*gorm.DB, error) {
	URL := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8&parseTime=True&loc=Local", defaultConfig.User, defaultConfig.Password, defaultConfig.Host, defaultConfig.Port, defaultConfig.DBName)
	db, err := gorm.Open("mysql", URL)

	db.AutoMigrate(&Transaction{})
	return db, err
}
