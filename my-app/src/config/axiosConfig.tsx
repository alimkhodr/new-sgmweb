import axios from 'axios';

const port = 3000;
const api = axios.create({
  baseURL: `http://backend:${port}/api`,
});

export default api;
