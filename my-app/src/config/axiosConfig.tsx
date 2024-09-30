import axios from 'axios';

const port = 3000;
const api = axios.create({
  baseURL: `https://mfgsvr3:${port}/api`,
  // baseURL: `https://10.251.42.158:${port}/api`,
});

export default api;
