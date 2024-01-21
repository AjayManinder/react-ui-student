// Login.js

import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Import the CSS file
const API_URL = process.env.REACT_APP_API_URL;
const React_Host = process.env.REACT_APP_React_Host;
const React_Port = process.env.REACT_APP_React_Port;
const Student_EP = process.env.REACT_APP_Student_Endpoint;

const Login = ({ setAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}://${React_Host}:${React_Port}/login`, { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      setAuthenticated(true);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
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
      <button className="login-btn" onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
