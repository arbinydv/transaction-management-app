package model

import (
	"fmt"
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
	User:     "root",
	Password: "MY_sql23@",
	Host:     "localhost",
	Port:     "3306",
	DBName:   "transaction",
}

func SetupDB() (*gorm.DB, error) {
	URL := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8&parseTime=True&loc=Local", defaultConfig.User, defaultConfig.Password, defaultConfig.Host, defaultConfig.Port, defaultConfig.DBName)
	db, err := gorm.Open("mysql", URL)

	// Logger
	db.LogMode(true)
	// AutoMigrate the Transaction model to create the table
	db.AutoMigrate(&Transaction{})
	return db, err
}
