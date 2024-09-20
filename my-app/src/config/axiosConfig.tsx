import axios from 'axios';

const port = 3000;
const api = axios.create({
  baseURL: `http://10.251.42.93:${port}/api`,
});

export default api;
