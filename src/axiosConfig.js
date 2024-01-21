// axiosConfig.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const React_Host = process.env.REACT_APP_React_Host;
const React_Port = process.env.REACT_APP_React_Port;

// Get the token from local storage
const token = localStorage.getItem('token');

// Create an Axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: `${API_URL}://${React_Host}:${React_Port}`,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`, // Set the Authorization header
  },
});

export default axiosInstance;
