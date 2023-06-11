import React, { useState } from 'react';
import axios from 'axios';

function Access() {
  const [accessToken, setAccessToken] = useState('');

  const exchangeToken = async (publicToken) => {
    try {
      const response = await axios.post('/plaid/token-exchange', { public_token: publicToken });
      const { success, accessToken: newAccessToken } = response.data;

      if (success) {
        setAccessToken(newAccessToken);
        // Perform any additional actions with the access token
      } else {
        // Handle the error case
        console.error('Failed to exchange public token');
      }
    } catch (error) {
      console.error('Error exchanging public token:', error);
    }
  };

  // Call the exchangeToken function when you have the public token
  // For example, in a click handler or another appropriate event

  return (
    <div>
      <h1>Plaid Access Token: {accessToken}</h1>
      {/* Render your other app components */}
    </div>
  );
}

export default Access;
