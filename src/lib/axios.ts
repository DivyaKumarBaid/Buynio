import axios from "axios";

export const baseURL = 'https://learning-nestjs.onrender.com/';

const api = axios.create({
  baseURL,
  headers: {
    // Add any custom headers here
  },
});

export default api;
