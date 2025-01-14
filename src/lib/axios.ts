import axios from "axios";

export const baseURL =
  (process.env.NEXT_PUBLIC_ENVIRONMENT == "DEV"
    ? process.env.NEXT_PUBLIC_APP_BASE_URL_DEV
    : process.env.NEXT_PUBLIC_APP_BASE_URL_PROD) || "" ;
const api = axios.create({
  baseURL,
  headers: {
    // Add any custom headers here
  },
});

export default api;
