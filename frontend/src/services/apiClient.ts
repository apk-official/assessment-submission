import axios from "axios";
/**
 * apiClient
 *
 * Centralised Axios instance for communicating with the backend API.
 *
 * Responsibilities:
 * - Configures a base URL from environment variables.
 * - Sets default JSON headers for all requests.
 * - Provides a shared HTTP client across the application.
 *
 * Notes:
 * - Falls back to `http://localhost:8002` if `VITE_API_URL` is not defined.
 */
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8002";

export const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
