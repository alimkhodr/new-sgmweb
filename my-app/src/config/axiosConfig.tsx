import axios from 'axios';

const port = 433;
const api = axios.create({
  baseURL: `http://10.251.42.250:${port}/api`,
});

export default api;
