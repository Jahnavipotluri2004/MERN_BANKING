// Account.js

import React, { useState } from 'react';

const Account = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateAccount = () => {
    // Implement account creation logic here
    console.log('Creating account...');
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
    // You can send this data to your backend for account creation
  };

  return (
    <div>
      <h2>Create an Account</h2>
      <form onSubmit={handleCreateAccount}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default Account;
