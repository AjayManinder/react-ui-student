import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Login.css'; // Import the CSS file
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const API_URL = process.env.REACT_APP_API_URL;
const React_Host = process.env.REACT_APP_React_Host;
const React_Port = process.env.REACT_APP_React_Port;

const MAX_LOGIN_ATTEMPTS = 5;

const Login = ({ setAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(MAX_LOGIN_ATTEMPTS);
  const [disabled, setDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const backgroundImageArray=['https://t4.ftcdn.net/jpg/02/16/47/33/360_F_216473351_FCLq1pZQOBFrgcyPBphKvBd8Z5wjD1dI.jpg', 'https://static.vecteezy.com/system/resources/thumbnails/007/164/537/small/fingerprint-identity-sensor-data-protection-system-podium-hologram-blue-light-and-concept-free-vector.jpg','https://t3.ftcdn.net/jpg/01/22/71/96/360_F_122719641_V0yw2cAOrfxsON3HeWi2Sf4iVxhv27QO.jpg']
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
  const dothis=()=>{
    const newIndex = (currentImageIndex + 1)%backgroundImageArray.length;
    setCurrentImageIndex(newIndex);
  }

  return (
    <div className='mainLoginContainer'>
    <div className='LoginHead' style={{ backgroundImage: `url(${backgroundImageArray[currentImageIndex]})` }} onDoubleClick={dothis}>
      <div className='h2'>Log into Portal</div>
      </div>
    <div className="login-container">
     
      <div className="input-group">
        <label>Email</label>
        <input className="input-field" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="input-group">
      <label>Password</label>
      <div style={{ position: 'relative' }}>
        <input
          className="input-field"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
          }}
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye/>}
        </span>
      </div>
    </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button className="login-btn" onClick={handleLogin} disabled={disabled}>
        Login
      </button>
      <div className='link-Fp'>
      <Link className="link-forgotpassword" to="/login" >Forgot Password</Link>
      </div>
      
       {disabled && <p style={{color:'red'}}>Login disabled, please try again later</p>}
    </div>
    </div>
  );
};

export default Login;
