# Overview 

NestJs Loan Data Rest API


# Setup 

### Install Dependencies
yarn 


### Run Application 
yarn run start


## API Endpoints

### User Authentication 

#### login
curl -X POST 'http://localhost:3000/users/login' -H 'Content-Type:application/json' -d '{"email":"jp@example.com", "password":"1234567Pass"}'


### Loan Management

### Get loans
curl -X GET 'http://localhost:3000/loans?status=active' -H 'Authorization: Bearer <TOKEN_FROM_LOGIN> -H 'Content-Type:application/json' 


### Get User loans
curl -X GET 'http://localhost:3000/loans/michaelbrown@example.com/get' -H 'Authorization: Bearer <TOKEN_FROM_LOGIN> -H 'Content-Type:application/json' 


#### Get Expired 
curl -X GET 'http://localhost:3000/loans/expired' -H 'Authorization: Bearer <TOKEN_FROM_LOGIN> -H 'Content-Type:application/json' 
