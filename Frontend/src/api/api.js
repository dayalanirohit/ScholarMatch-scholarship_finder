=import axios from 'axios';

// The baseURL now dynamically uses an environment variable
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const API = axios.create({ baseURL: `${API_URL}/api` });

export const signup = (data) => API.post('/auth/signup', data);
export const login = (data) => API.post('/auth/login', data);
