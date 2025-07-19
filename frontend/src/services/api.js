import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.PROD
    ? import.meta.env.VITE_API_URL || "/api" // Production
    : "/api", // Development (proxied)
  withCredentials: true,
});

export default api;
