# Description

This Express.js API interacts with a MySQL database to manage user balances and transactions. It provides functionalities to retrieve a user's balance, update it, and transfer funds between users.

### **API Features and Endpoints:**

`GET /getBalance/:id`: Retrieves the balance of a user specified by their ID.

- **_Example Request_**:
  Request: `GET /getBalance/1`

`POST /updateBalance/:id`: Updates the balance for a specified user. If no balance record exists, a new record with a zero balance is created.

- **Request Body** (application/json): `amount` (required): The amount to update the balance by.

- **_Example Request_**:
  Request: `POST /updateBalance/2`
  Request body: `{ "amount": 50 }`

`POST /transferFunds`: Transfers funds from one user to another. The transaction is logged, and balances are updated within a database transaction.

- **Request Body** (application/json):
  `fromUserId` (required): The ID of the user sending the funds.
  `toUserId` (required): The ID of the user receiving the funds.
  `amount` (required): The amount to transfer.

- **_Example Request_**:
  Request: `POST /transferFunds`
  Request body: ` { "fromUserId": 1,   "toUserId": 2,   "amount": 25 }`

# Get Started

To run this web app you need (if not installed yet):

- [NodeJS](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/)

Then:

- Clone the repository with `git clone https://github.com/mayerprog/balance-manager-api`
- Install dependencies `yarn install`
- Run `nodemon app.js` to run the server

## Important onfiguration

- SQL configuration is located in init-db.sql file
- In the file database.js put your db configuration: host, user, password. Database name is balance_db (check init-db.sql for more information).

## Tecnologies

- Express.js
- MySQL

## Contacts

<p>Mayra Tulegenova</p>

- Telegram: [mayerprog](https://t.me/mayerprog)
- Email: [supermayerehs@gmail.com](supermayerehs@gmail.com)
