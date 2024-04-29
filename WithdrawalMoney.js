import React, { useState } from 'react';

// Withdrawal Data Management
const withdrawalData = [];

const addWithdrawalData = (withdrawalDetails) => {
  withdrawalData.push(withdrawalDetails);
};

const getWithdrawalDataText = () => {
  return withdrawalData.map((withdrawalDetail, index) => {
    return `Withdrawal ${index + 1}:\nRecipient: ${withdrawalDetail.recipientId}\nAmount: ${withdrawalDetail.transferAmount}\nUPI ID: ${withdrawalDetail.upiId}\nTimestamp: ${withdrawalDetail.timestamp}\n\n`;
  }).join('');
};

// WithdrawalMoney Component
const WithdrawalMoney = ({ onTransfer, updateBankInformation }) => {
  const [transferAmount, setTransferAmount] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [upiId, setUpiId] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isPhoneNumberError, setIsPhoneNumberError] = useState(false);
  const [totalTransferredToday, setTotalTransferredToday] = useState(0);

  const withdrawalSectionStyle = {
    backgroundColor: 'palegreen',
    padding: '40px',
    borderRadius: '8px',
    position: 'relative',
    maxWidth: '400px', // Set a maximum width
    margin: '0 auto', // Center align the section
  };

  const h2Style = {
    textAlign: 'center',
  };

  const labelStyle = {
    display: 'block',
    marginTop: '10px',
  };

  const inputStyle = {
    width: '100%',
    padding: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginBottom: '10px',
  };

  const buttonStyle = {
    backgroundColor: 'green',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const errorMessageStyle = {
    color: 'red',
  };


  const handleTransfer = () => {
    setIsPhoneNumberError(false);

    if (isInputValid()) {
      const maxTransferAmount = 1000000;
      if (totalTransferredToday + transferAmount <= maxTransferAmount) {
        if (selectedOption === 'upi' && isValidUpiId(upiId)) {
          onTransfer(selectedOption, upiId, transferAmount);
          updateBankInformation(transferAmount);
        } else if (selectedOption === 'phone' && isValidPhoneNumber(recipientId)) {
          onTransfer(selectedOption, recipientId, transferAmount);
          updateBankInformation(transferAmount);
        }

        const withdrawalDetails = {
          recipientId,
          transferAmount,
          upiId,
          timestamp: new Date().toString(),
        };

        addWithdrawalData(withdrawalDetails);

        setTransferAmount(0);
        setSelectedOption('');
        setRecipientId('');
        setUpiId('');
        setSuccessMessage('Money Transferred Successfully');
        setTotalTransferredToday(totalTransferredToday + transferAmount);
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setSuccessMessage('Total transfers today cannot exceed 1,000,000');
      }
    } else {
      setIsPhoneNumberError(true);
    }
  };

  const isValidUpiId = (upiId) => {
    const validUpiIds = ['suryaakkala@ybl'];
    return validUpiIds.includes(upiId);
  };

  const isValidPhoneNumber = (phoneNumber) => {
    // Add valid phone numbers here
    const validPhoneNumbers = [];
    return validPhoneNumbers.includes(phoneNumber);
  };

  const isInputValid = () => {
    if (selectedOption === 'phone' && recipientId.length === 10) {
      return true;
    }
    return selectedOption === 'upi' && isValidUpiId(upiId);
  };

  const downloadWithdrawalDetails = () => {
    const withdrawalText = getWithdrawalDataText();
    const blob = new Blob([withdrawalText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'withdrawal_details.txt';
    a.click();
  };

  return (
<div style={withdrawalSectionStyle}>
<h2 style={h2Style}>TRANSFER MONEY</h2>
<label style={labelStyle}>Select Transfer Option:</label>    
<select style={inputStyle} value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
          <option value="">Select Option</option>
        <option value="upi">UPI ID</option>
        <option value="phone">Phone Number</option>
      </select>
      {selectedOption && (
        selectedOption === 'upi' ? (
          <>
            <label>UPI ID:</label>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
          </>
        ) : (
          <>
            <label>Phone Number:</label>
            <input
              type="text"
              value={recipientId}
              onChange={(e) => setRecipientId(e.target.value)}
            />
          </>
        )
      )}
      {isPhoneNumberError && (
        <div style={errorMessageStyle}>Phone number should be exactly 10 digits</div>
      )}
      <label>Amount:</label>
      <input
        type="number"
        value={transferAmount}
        onChange={(e) => setTransferAmount(parseInt(e.target.value))}
      />
      <div style={{ color: 'red' }}>Maximum transfer amount: 1,000,000 within 24 hours</div>
      <button onClick={handleTransfer} style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
        Transfer
      </button>
      <button onClick={downloadWithdrawalDetails} style={{ position: 'absolute', bottom: '10px', left: '10px' }}>
        Download Withdrawal Details
      </button>
      {successMessage && (
        <div style={{ backgroundColor: 'green', color: 'white', textAlign: 'center', marginTop: '10px', padding: '5px' }}>
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default WithdrawalMoney;