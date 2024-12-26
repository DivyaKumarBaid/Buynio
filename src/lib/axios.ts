import axios from "axios";

export const baseURL = process.env.NEXT_PUBLIC_APP_BASE_URL || ""
const api = axios.create({
  baseURL,
  headers: {
    // Add any custom headers here
  },
});

export default api;
