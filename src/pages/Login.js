import React, { useState, useEffect } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axiosInstance from '../axiosConfig';

const MAX_LOGIN_ATTEMPTS = 5;

const Login = ({ setAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(MAX_LOGIN_ATTEMPTS);
  const [disabled, setDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // const [userResponse] = useContext(Context);
  const backgroundImageArray = [
    'https://t4.ftcdn.net/jpg/02/16/47/33/360_F_216473351_FCLq1pZQOBFrgcyPBphKvBd8Z5wjD1dI.jpg',
    'https://static.vecteezy.com/system/resources/thumbnails/007/164/537/small/fingerprint-identity-sensor-data-protection-system-podium-hologram-blue-light-and-concept-free-vector.jpg',
    'https://t3.ftcdn.net/jpg/01/22/71/96/360_F_122719641_V0yw2cAOrfxsON3HeWi2Sf4iVxhv27QO.jpg'
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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
      setLoading(true)
      if (disabled) {
        console.error('Login disabled. Too many unsuccessful attempts.');
        return;
      }
    
  
      const response = await axiosInstance.post(`/login`, { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      console.log('Token stored in localStorage:', token);
     const setLocalstorage= localStorage.setItem('loginTimestamp', Date.now());
     console.log('loginTimestamp stored in localStorage:', setLocalstorage);
      setAuthenticated(true); 
  
      // Fetch user details after successful login
      const userResponse = await axiosInstance.get('/users');
      const user = userResponse.data.find(u => u.email === email);
  
      // Check user role and name
      if (user) {
        const { role_id, user_id} = user;
        console.log('User details:', user);
  
        // Extract roleName from role_id object
        const roleName = role_id?.roleName || '';
  
        // Set authentication state and user details
        setAuthenticated(true);

        if (roleName === 'student') {
          console.log("role name" , roleName);
          const studentResponse = await axiosInstance.get(`/students?user_id=${user_id}`);
          const student = studentResponse.data[0];  // Assuming there is only one student per user
          
          if (student) {
            // Update state with student name
            setUserDetails(prevDetails => ({ ...prevDetails, name: student.name }));
          }
  
        // Redirect based on the role
        setLoading(true);
          navigate('/studentInfo');
        } else if (roleName === 'teacher') {
          navigate('/table');
        } else if (roleName === 'admin') {
          navigate('/table');
        }
      }
     
    } catch (error) {
      
      console.error('Login failed:', error);
      setLoginAttempts(prevAttempts => prevAttempts - 1);
      setLoading(false);
      setErrorMessage(`Invalid email or password. \n${loginAttempts - 1} attempts left.`);
    }
  };
  const dothis = () => {
    const newIndex = (currentImageIndex + 1) % backgroundImageArray.length;
    setCurrentImageIndex(newIndex);
  };

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
              {showPassword ? <FaEyeSlash /> : <FaEye />}
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
        {disabled && <p style={{ color: 'red' }}>Login disabled, please try again later</p>}
      </div>
      {loading && <div className="loadingMessage">Loading...</div>}
    </div>
    
  );
};

export default Login;
