//BankInfoDetails.js

import React, { useState } from 'react';

const BankInfoDetails = () => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="bank-info-details">
      <h2 style={{ textAlign: 'center' }}>Bank Details</h2>
      {showDetails ? (
        <>
          <p>
          KL Bank is a reputable financial institution offering a comprehensive,
           range of banking services to cater to the needs of both individuals and
            businesses. With a strong commitment to customer satisfaction, Roy Bank
             has established itself as a reliable and customer-centric banking solution.
          </p>
          <p>
          Loans and Mortgages: Anya Bank offers various loan options, including personal 
          loans, auto loans, and home mortgages, enabling customers to realize their financial aspirations.
          </p>
          <button onClick={toggleDetails} style={{ display: 'block', margin: 'auto' }}>
            Close
          </button>
        </>
      ) : (
        <button onClick={toggleDetails} style={{ display: 'block', margin: 'auto' }}>
          Info
        </button>
      )}
    </div>
  );
};

export default BankInfoDetails;
