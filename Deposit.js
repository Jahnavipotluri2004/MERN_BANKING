//Deposit.js

import React, { useState } from 'react';

const Deposit = ({ onDeposit }) => {
  const [depositAmount, setDepositAmount] = useState(0);

  const handleDeposit = () => {
    if (depositAmount > 0) {
      onDeposit(depositAmount);
      setDepositAmount(0);
    }
  };

  return (
    <div>
      <h2>Deposit Money</h2>
      <input
        type="number"
        value={depositAmount}
        onChange={(e) => setDepositAmount(parseInt(e.target.value))}
      />
      <button onClick={handleDeposit}>Deposit</button>
      </div>
  );
};

export default Deposit;