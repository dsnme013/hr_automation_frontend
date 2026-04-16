// // // Axios client for the Flask API
// import axios from "axios";

// export const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000",
//   withCredentials: false,
//   timeout: 15000,
// });

// // Attach token, if present
// api.interceptors.request.use((config) => {
//   const token = typeof window !== "undefined" ? localStorage.getItem("tf_token") : null;
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });
import axios from "axios";

export const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "https://lead-shades-wheels-surprising.trycloudflare.com"

export const api = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: false,
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("tf_token") : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
