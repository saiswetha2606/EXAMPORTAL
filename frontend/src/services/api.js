import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const loginUser = (data) => API.post('/auth/login', data);
export const registerUser = (data) => API.post('/auth/register', data);
export const fetchUserProfile = (userId) => API.get(`/users/profile/${userId}`);
