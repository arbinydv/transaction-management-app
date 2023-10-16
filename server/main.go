package main

import (
	"fmt"
	"os"

	"github.com/arbinydv/server/api"

	"github.com/gin-gonic/gin"
)

func main() {
	fmt.Println("Hello App!")

	// port

	port := os.Getenv("PORT")

	if port == "" {
		port = "4000"
	}

	// api setup
	router := gin.New()

	router.Use(gin.Logger())

	// router.Use(cors.Default()) // CORS attack prevention

	// API END POINTS
	// healthCheck

	router.Run(":" + port)

	router.GET("/healthcheck", api.HealthCheck)

}
