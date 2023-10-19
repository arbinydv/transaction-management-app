package api

import (
	"net/http"
	"time"
	"transaction-management-app/model"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

type AddTransactionInput struct {
	Date          string `json:"date"`
	Sender        string `json:"sender"`
	Receiver      string `json:"receiver"`
	Amount        string `json:"amount"`
	Account       string `json:"account"`
	PaymentMethod string `json:"paymentMethod"`
}

func HealthCheck(c *gin.Context) {
	c.JSON(200, gin.H{"message": "Health check OK"})
}

func GetTransactions(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	var transactions []model.Transaction
	db.Find(&transactions)

	c.JSON(http.StatusOK, gin.H{"data": transactions})

}

func GetTransactionById(c *gin.Context) {
	var transaction model.Transaction

	db := c.MustGet("db").(*gorm.DB)
	if err := db.Where("id = ?", c.Param("id")).First(&transaction).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Transaction not found!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": transaction})
}

func AddTransaction(c *gin.Context) {

	var payload AddTransactionInput

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	dateLayout := "2006-01-02T15:04:05Z"
	timestamp, err := time.Parse(dateLayout, payload.Date)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid date format"})
		return
	}

	transaction := model.Transaction{
		Date:          timestamp,
		Sender:        payload.Sender,
		Receiver:      payload.Receiver,
		Amount:        payload.Amount,
		Account:       payload.Account,
		PaymentMethod: payload.PaymentMethod,
	}

	// Save the transaction to the database
	db := c.MustGet("db").(*gorm.DB)
	if err := db.Create(&transaction).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create transaction"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": transaction})

}
