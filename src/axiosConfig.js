import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const React_Host = process.env.REACT_APP_React_Host;
const React_Port = process.env.REACT_APP_React_Port;

// Create an Axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: `${API_URL}://${React_Host}:${React_Port}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the authorization token in each request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
