package main

import (
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
)

func main() {
	fmt.Println("Hello App!")

	// creating a Go App
	app := fiber.New()

	// HealthCheck and port assigment

	app.Get("/healthcheck", func(ctx *fiber.Ctx) error {
		return ctx.SendString("OK")
	})

	// Listen to Port
	log.Fatal(app.Listen(":4000"))
}
