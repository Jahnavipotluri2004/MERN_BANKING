//app.js

import React, { useState } from 'react';
import './App.css'; // Import your CSS file
import BankInformation from './BankInformation';
import BankInfoDetails from './BankInfoDetails';
import Binterface from './Binterface';
import Login from './Login';
import QRCodeGenerator from './QRCodeGenerator';
import WithdrawalMoney from './WithdrawalMoney';
import Navbar from './Navbar';
import AddAccount from './AddAccount';

function App() {
  const [totalAmount, setTotalAmount] = useState(400000000); // Initial total amount
  const [currentView, setCurrentView] = useState('home');
  
  const sendLoginNotification = () => {
    fetch('/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userEmail: 'ayrus2222@gmail.com', // Pass the user's email here
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          console.log('Email notification sent successfully');
        } else {
          console.error('Email notification failed');
        }
      })
      .catch((error) => {
        console.error('Error sending email notification:', error);
      });
  };
  
    const [accountBalance, setAccountBalance] = useState(1000); // Initial balance
    const [loggedIn, setLoggedIn] = useState(false); // Initial login state
    const [bankBalance, setBankBalance] = useState(10000);
    const [transactions, setTransactions] = useState([]);

    const handleDeposit = (amount) => {
      setAccountBalance(accountBalance + amount);
    };
  
    const handleLogin = () => {
      // Implement your login logic here (e.g., validate user credentials)
      // For simplicity, we'll just set loggedIn to true
      setLoggedIn(true);
      sendLoginNotification();
    };
  
    const handleLogout = () => {
      // Implement your logout logic here (e.g., clear session)
      // For simplicity, we'll just set loggedIn to false
      setLoggedIn(false);
    };

    

  const handleTransfer = (transferType, recipient, amount) => {
    if (transferType === 'upi') {
      if (amount <= bankBalance) {
        setBankBalance(bankBalance - amount);
      } else {
        alert('Insufficient funds');
      }
    } else if (transferType === 'phone') {
      if (amount <= bankBalance) {
        setBankBalance(bankBalance - amount);
      } else {
        alert('Insufficient funds');
      }
    }
    setTotalAmount(totalAmount - amount);
  };
  const updateBankInformation = (amount) => {
    // Implement logic to update the bank information (if needed)
    // For example, up-date the balance or transaction history.
    const newBankBalance = bankBalance + amount;
  setBankBalance(newBankBalance);

  // Maintain a transaction history (you can use an array to store transactions)
  const transaction = {
    type: 'deposit',
    amount: amount,
    timestamp: new Date(),
  };

  // Assuming you have a 'transactions' array state
  const updatedTransactions = [...transactions, transaction];
  setTransactions(updatedTransactions);
  };
    return (
      <div className="App">
      {loggedIn ? (
        <div className="container">
          <Navbar onNavClick={setCurrentView} onLogout={handleLogout} />

          {currentView === 'home' && (
            <>
              <h2>Welcome, {}!</h2>
              <BankInformation className="BankInformation" />
              <BankInfoDetails className="BankInfoDetails" />
              <Binterface className="Binterface" />

            </>
          )}

          {currentView === 'moneyTransfer' && (
            <>
              <h1>Banking App</h1>
              <p>Account Balance: ${accountBalance}</p>
              <p>Bank Balance: ${bankBalance}</p>
              <WithdrawalMoney onTransfer={handleTransfer} />
              <QRCodeGenerator className="QRCodeGenerator" />
            </>
          )}
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
       
    </div>
    );
  }
export default App;