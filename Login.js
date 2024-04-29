//Login.js

import React, { useState, useEffect } from 'react';
import users from './userStore';
import './Login.css'; // Import your CSS file

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [enteredCaptcha, setEnteredCaptcha] = useState('');
  const [generatedCaptcha, setGeneratedCaptcha] = useState('');

  useEffect(() => {
    // Generate a random captcha text on component mount
    generateCaptcha();
  }, []);

  const handleLogin = () => {
    if (enteredCaptcha.toLowerCase() === generatedCaptcha.toLowerCase()) {
      const user = users.find((user) => user.username === username && user.password === password);

      if (user) {
        onLogin(user.username);
      } else {
        alert('Invalid credentials');
      }
    } else {
      alert('Incorrect Captcha! Please try again.');
      generateCaptcha();
    }
  };

  const generateCaptcha = () => {
    // Generate a random alphanumeric string of a fixed length (e.g., 6 characters)
    const chars = 'ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedCaptcha(captcha);
  };

  return (
    <div className="login-container"> {/* Apply the login-container class */}
      <div className="login-form"> {/* Apply the login-form class */}
        <h2>Login</h2>
        <form>
          <div>
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <label>Captcha:</label>
            <input type="text" value={enteredCaptcha} onChange={(e) => setEnteredCaptcha(e.target.value)} />
            <span>Captcha: {generatedCaptcha}</span>
          </div>
          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
