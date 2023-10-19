## Getting App up and running 
  - Ensure your Database is connected and running 
  - Inside server 
    - go run main.go
### CRUD Operations
Add Transaction
```
Endpoint: `localhost:4000/transaction/create`
TYPE: POST

API Body
  
  {
     "date": "2023-10-18T22:30:00Z",
      "sender": "Dummy Sender",
      "receiver": "Dummy receiver ",
      "amount": "$4,400.56",
      "account": "Savings",
      "paymentMethod": "Paypal"
  }
```

List  Transaction 
```
Endpoint: `localhost:4000/transactions`
TYPE: GET

API Response
  
{
    "data": [
        {
            "ID": 1,
            "CreatedAt": "2023-10-17T10:17:25+05:45",
            "UpdatedAt": "2023-10-17T10:17:25+05:45",
            "DeletedAt": null,
            "date": "2023-10-17T17:45:00+05:45",
            "sender": "Dummy Sender",
            "receiver": "Dummy receiver ",
            "amount": "$4,400.56",
            "account": "Savings",
            "paymentMethod": "Paypal"
        },
    ]
}
```






    

