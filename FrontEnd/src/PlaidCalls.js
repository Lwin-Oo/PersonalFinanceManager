import { PlaidLink } from 'react-plaid-link';

<PlaidLink
  token="access-sandbox-caef860f-daec-438c-9447-3919fc360dd4"
  onSuccess={handlePlaidSuccess}
  onExit={handlePlaidExit}
  // Additional configuration options
>
  Connect with Plaid
</PlaidLink>

const handlePlaidSuccess = (publicToken, metadata) => {
    // Handle successful Plaid authentication
    // You can exchange the public token for an access token on your server
    // and store it for future API requests
    console.log('Plaid authentication successful');
    console.log('Public token:', publicToken);
    console.log('Metadata:', metadata);
  };
  
  const handlePlaidExit = (error, metadata) => {
    // Handle Plaid authentication exit
    // You can handle any necessary actions or UI updates
    console.log('Plaid authentication exited');
    console.log('Error:', error);
    console.log('Metadata:', metadata);
  };
  