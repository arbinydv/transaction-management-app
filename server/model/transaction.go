package model

import (
	"github.com/jinzhu/gorm"
	"time"
)

type Transaction struct {
	gorm.Model
	Date          time.Time `json:"date"`
	Sender        string    `json:"sender"`
	Receiver      string    `json:"receiver"`
	Amount        string    `json:"amount"`
	Account       string    `json:"account"`
	PaymentMethod string    `json:"paymentMethod"`
}
