// Fetch transactions from your server-side implementation
async function fetchTransactions() {
    try {
      const response = await fetch('/api/transactions'); // Update the API endpoint based on your implementation
      const data = await response.json();
      return data.transactions; // Assuming the response contains a "transactions" array
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return [];
    }
  }
  
  // Render transactions on the web app
async function renderTransactions() {
    const transactions = await fetchTransactions();
    const transactionsContainer = document.getElementById('transactions');
  
    transactions.forEach(transaction => {
      const transactionElement = document.createElement('div');
      transactionElement.classList.add('transaction');
      transactionElement.innerHTML = `
        <span>${transaction.date}</span>
        <span>${transaction.name}</span>
        <span>${transaction.amount}</span>
      `;
      transactionsContainer.appendChild(transactionElement);
    });
  }
  
  renderTransactions();
  