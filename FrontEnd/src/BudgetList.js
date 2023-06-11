import React from 'react';

const BudgetList = ({ budgets, deleteBudget }) => {
  const handleDelete = (id) => {
    // Filter out the budget with the specified id
    const updatedBudgets = budgets.filter((budget) => budget.id !== id);

    // Update the parent component's state by calling the deleteBudget function passed as prop
    deleteBudget(updatedBudgets);
  };

  return (
    <div>
      <h2>Budget List</h2>
      {budgets.length === 0 ? (
        <p>No budgets available.</p>
      ) : (
        <ul>
          {budgets.map((budget) => (
            <li key={budget.id}>
              <span>{budget.title}</span>
              <span>{budget.amount}</span>
              <button onClick={() => handleDelete(budget.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BudgetList;
