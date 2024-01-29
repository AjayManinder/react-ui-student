import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Login.css'; // Import the CSS file

const API_URL = process.env.REACT_APP_API_URL;
const React_Host = process.env.REACT_APP_React_Host;
const React_Port = process.env.REACT_APP_React_Port;
const Student_EP = process.env.REACT_APP_Student_Endpoint;

const MAX_LOGIN_ATTEMPTS = 5;

const Login = ({ setAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(MAX_LOGIN_ATTEMPTS);
  const [disabled, setDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (loginAttempts === 0) {
      setDisabled(true);
    }
  }, [loginAttempts]);

  const handleLogin = async () => {
    try {
      if (disabled) {
        console.error('Login disabled. Too many unsuccessful attempts.');
        return;
      }

      const response = await axios.post(`${API_URL}://${React_Host}:${React_Port}/login`, { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      setAuthenticated(true);
    } catch (error) {
      console.error('Login failed:', error);
      setLoginAttempts(prevAttempts => prevAttempts - 1);
      setErrorMessage(`Invalid email or password. \n${loginAttempts - 1} attempts left.`);

    }
  };

  return (
    <div className='mainLoginContainer'>
    <div className="login-container">
      <h2>Login</h2>
      
      <div className="input-group">
        <label>Email</label>
        <input className="input-field" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="input-group">
        <label>Password</label>
        <input className="input-field" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button className="login-btn" onClick={handleLogin} disabled={disabled}>
        Login
      </button>
       {disabled && <p style={{color:'red'}}>Login disabled, please try again later</p>}
    </div>
    </div>
  );
};

export default Login;
