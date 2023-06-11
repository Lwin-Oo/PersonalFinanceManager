
import Header from './Header';
import BudgetForm from './BudgetForm';
import BudgetList from './BudgetList';



import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [budgets, setBudgets] = useState([]);

  const addBudget = (newBudget) => {
    setBudgets((prevBudgets) => [...prevBudgets, newBudget]);
  };

  const deleteBudget = (updatedBudgets) => {
    setBudgets(updatedBudgets);
  };

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await axios.get('/api/budgets');
        setBudgets(response.data);
      } catch (error) {
        console.error('Error fetching budgets:', error);
      }
    };

    fetchBudgets();
  }, []);

  return (
    <div>
      <Header />
      <main>
        <BudgetForm addBudget={addBudget} />
        <BudgetList budgets={budgets} deleteBudget={deleteBudget} />
      </main>
    </div>
  );
};

export default App;
