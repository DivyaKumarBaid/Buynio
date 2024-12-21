import axios from "axios";

export const baseURL = 'https://hopster-app-server.onrender.com/';
// export const baseURL = 'https://hopster-app-server-production.up.railway.app/';
// export const baseURL = 'http://localhost:3001/';

const api = axios.create({
  baseURL,
  headers: {
    // Add any custom headers here
  },
});

export default api;
