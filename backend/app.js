const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const transactionRoutes = require('./routes/transaction'); // Assuming you have a transaction route file
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000; // Default to 5000 if PORT is not set

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/v1", transactionRoutes); // Ensure the transaction route is properly imported

// Server function
const server = () => {
    db(); // Initialize the database connection
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`);
    });
};

server();
