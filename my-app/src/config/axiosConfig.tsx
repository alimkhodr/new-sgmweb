import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.251.42.250:5000/api',
});

export default api;
