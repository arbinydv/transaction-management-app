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

	port := os.Getenv("PORT")
	if port == "" {
		port = "4000"
	}

	router := gin.Default()
	router.Use(cors.Default())

	if err := godotenv.Load(); err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	db, err := model.SetupDB()
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

	err = router.Run(":" + port)
	if err != nil {
		fmt.Println("Server failed to start:", err)
	}

}
