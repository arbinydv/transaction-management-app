package main

import (
	"fmt"
	"log"
	"os"
	"transaction-management-app/api"
	"transaction-management-app/model"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	var defaultConfig = &model.Config{
		User:     os.Getenv("DB_USER"),
		Password: os.Getenv("DB_PASSWORD"),
		Host:     os.Getenv("DB_HOST"),
		Port:     os.Getenv("DB_PORT"),
		DBName:   os.Getenv("DB_NAME"),
	}

	router := gin.Default()
	router.Use(cors.Default())

	db, err := model.SetupDB(*defaultConfig)
	if err != nil {
		fmt.Println("Failed connecting to the database:", err)
	}
	defer db.Close()

	// Set db key for the API endpoint
	router.Use(func(c *gin.Context) {
		c.Set("db", db)
	})

	router.GET("/transactions", api.GetTransactions)
	router.GET("/transactions/:id", api.GetTransactionById)
	router.POST("/transaction/create", api.AddTransaction)

	err = router.Run()
	if err != nil {
		fmt.Println("Server failed to start:", err)
	}

}
