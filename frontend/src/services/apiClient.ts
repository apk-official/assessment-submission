// src/services/apiClient.ts
import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8002";

export const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: global error logging (keep it simple for assessment)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can improve this later (e.g., toast)
    console.error("API Error:", error?.response?.data || error.message);
    return Promise.reject(error);
  }
);