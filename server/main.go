package main

import (
	"fmt"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"os"
	"transaction-management-app/api"
	"transaction-management-app/model"
)

func main() {
	fmt.Println("Hello App!")

	// Port
	port := os.Getenv("PORT")
	if port == "" {
		port = "4000"
	}

	router := gin.Default()
	router.Use(cors.Default()) // Enable CORS

	// Database setup
	db, err := model.SetupDB()
	if err != nil {
		fmt.Println("Failed connecting to the database:", err)
	}
	defer db.Close()

	// Set db key for the API endpoint
	router.Use(func(c *gin.Context) {
		c.Set("db", db)
	})

	// Define your API endpoints and handlers
	router.GET("/transactions", api.GetTransactions)
	router.GET("/transactions/:id", api.GetTransactionById)
	router.POST("/transaction/create", api.AddTransaction)

	// Run the server
	err = router.Run(":" + port)
	if err != nil {
		fmt.Println("Server failed to start:", err)
	}

}
