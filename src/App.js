import React, { useState } from 'react';
import './App.css';

function App() {
  // State variables for inputs
  const [income, setIncome] = useState('');
  const [rent, setRent] = useState('');
  const [food, setFood] = useState('');
  const [transport, setTransport] = useState('');
  const [other, setOther] = useState('');

  // State variables for results
  const [balance, setBalance] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleCalculate = () => {
    // 4.a: Validate all input fields
    // Check for empty fields
    if (!income || !rent || !food || !transport || !other) {
      alert('All input fields are required.');
      return;
    }

    const numIncome = parseFloat(income);
    const numRent = parseFloat(rent);
    const numFood = parseFloat(food);
    const numTransport = parseFloat(transport);
    const numOther = parseFloat(other);

    // Check for negative numbers
    if ([numIncome, numRent, numFood, numTransport, numOther].some(val => isNaN(val) || val < 0)) {
      alert('All inputs must be positive numbers.');
      return;
    }

    // 4.b: Calculate Remaining Balance
    const totalExpenses = numRent + numFood + numTransport + numOther;
    const remainingBalance = numIncome - totalExpenses;

    // 5. Display the calculated balance
    setBalance(remainingBalance.toFixed(2)); // .toFixed(2) for currency format

    // 6 & 7: Display message based on balance
    if (remainingBalance < 0) {
      setMessage('You are overspending!');
      setMessageType('error');
    } else {
      setMessage('Good job managing your expenses!');
      setMessageType('success');
    }
  };

  return (
    <div className="budget-calculator">
      <h2>Budget Calculator App</h2>
      
      {/* 2. Input fields */}
      <div className="input-group">
        <label>Monthly Income:</label>
        <input
          type="number"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          placeholder="e.g., 3000"
        />
      </div>
      <div className="input-group">
        <label>Rent/EMI:</label>
        <input
          type="number"
          value={rent}
          onChange={(e) => setRent(e.target.value)}
          placeholder="e.g., 800"
        />
      </div>
      <div className="input-group">
        <label>Food Expenses:</label>
        <input
          type="number"
          value={food}
          onChange={(e) => setFood(e.target.value)}
          placeholder="e.g., 500"
        />
      </div>
      <div className="input-group">
        <label>Transport Expenses:</label>
        <input
          type="number"
          value={transport}
          onChange={(e) => setTransport(e.target.value)}
          placeholder="e.g., 150"
        />
      </div>
      <div className="input-group">
        <label>Other Expenses:</label>
        <input
          type="number"
          value={other}
          onChange={(e) => setOther(e.target.value)}
          placeholder="e.g., 200"
        />
      </div>

      {/* 3. Calculate Button */}
      <button onClick={handleCalculate} className="calculate-btn">
        Calculate Balance
      </button>

      {/* 5, 6, 7: Result Display */}
      {balance !== null && (
        <div className="result-container">
          <h3>Remaining Balance: 
            {/* The $ sign is just for display, you can change it to your currency */}
            <span className={messageType}>
              ${balance}
            </span>
          </h3>
          <p className={messageType}>
            {message}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;