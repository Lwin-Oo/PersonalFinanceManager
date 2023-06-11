import React, { useState }  from "react";

const BudgetForm = ({addBudget}) => {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        
        if(!title || !amount) {
            alert('Please enter a little and amount.');
            return;
        }

       
    
    //Create a new budget object
    
    const newBudget ={
        id: Math.random().toString(36).substr(2, 9), title,
        amount: parseFloat(amount),
    };

    //Call the addBudget function passed as prop to update the parent component state
    addBudget(newBudget);

    //Reset from fields
    setTitle('');
    setAmount('');

};
    return (
    <div>
      <h2>Add Budget</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button type="submit">Add Budget</button>
      </form>
    </div>
    );
};

export default BudgetForm;