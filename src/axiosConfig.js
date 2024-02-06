import axios from 'axios';

const API_PROTOCOL = process.env.REACT_APP_API_PROTOCOL;
const API_HOST = process.env.REACT_APP_API_HOST;


console.log('REACT_APP_API_PROTOCOL:', process.env.REACT_APP_API_PROTOCOL);
console.log('REACT_APP_API_HOST:', process.env.REACT_APP_API_HOST);

// Create an Axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: `${API_PROTOCOL}://${API_HOST}`,
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
