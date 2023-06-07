const express = require('express');
const axios = require('axios');
const plaid = require('plaid');

// Plaid credentials
const PLAID_CLIENT_ID = '64742608ef31e7001987c268';
const PLAID_SECRET = 'b2c6abfb01ca32784a14cc27121d5e';

const PLAID_ENV = 'sandbox'; // 

// Initialize Plaid client
const plaidClient = new plaid.Client({
  clientID: PLAID_CLIENT_ID,
  secret: PLAID_SECRET,
  env: PLAID_ENV,
});

const app = express();

// API endpoint to fetch transactions
app.get('/api/transactions', async (req, res) => {
  try {
    // Retrieve transactions using Plaid client
    const accessToken = 'access-sandbox-caef860f-daec-438c-9447-3919fc360dd4'; // generated from plaid
    const { transactions } = await plaidClient.transactions.getAll(
      accessToken,
      { count: 10 } 
    );
    
    res.json({ transactions });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

const PORT = 3000; // Customize the port number 

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
