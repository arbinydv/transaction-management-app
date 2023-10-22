package model

import (
	"fmt"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
)

type Config struct {
	User     string `env:"DB_USER"`
	Password string
	Host     string
	Port     string
	DBName   string
}

// var defaultConfig = Config{
// 	User: string   `env:"DB_USER"`,
// 	Password:  string `env:"DB_PASSWORD"`,
// 	Host:  string   `env:"DB_HOST"`,
// 	Port: string    `env:"DB_PORT"`,
// 	DBName:  string  `env:"DB_NAME"`,
// }

func SetupDB(defaultConfig Config) (*gorm.DB, error) {

	fmt.Printf("config %+v", defaultConfig)
	URL := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8&parseTime=True&loc=Local", defaultConfig.User, defaultConfig.Password, defaultConfig.Host, defaultConfig.Port, defaultConfig.DBName)
	fmt.Printf("Here: %s:%s@tcp(%s:%s)/%s?charset=utf8&parseTime=True&loc=Local", defaultConfig.User, defaultConfig.Password, defaultConfig.Host, defaultConfig.Port, defaultConfig.DBName)
	db, err := gorm.Open("mysql", URL)

	db.AutoMigrate(&Transaction{})
	return db, err
}
