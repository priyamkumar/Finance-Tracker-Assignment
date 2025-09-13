# Finance Tracker

A full-stack personal finance tracking application built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Installation
1. Clone the repository:
```bash
git clone https://github.com/priyamkumar/Finance-Tracker-Assignment.git
cd Finance-Tracker-Assignment
```

2. Install server dependencies:
```bash
cd backend
npm install
```

3. Install client dependencies:
```bash
cd frontend
npm install
cd ..
```

4. Create a `.env` file in the backend directory and add:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/finance-tracker
```
 Create a `.env` file in the frontend directory and add:
```env
VITE_SERVER=http://localhost:5000
```

5. Start MongoDB service (if running locally)

## API Endpoints

- `GET /api/transaction` - Get all transactions
- `GET /api/transaction/:id` - Get single transaction
- `POST /api/transaction/create` - Create new transaction
- `PUT /api/transaction/:id` - Update transaction
- `DELETE /api/transaction/:id` - Delete transaction
