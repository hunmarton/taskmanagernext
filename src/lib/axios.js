import Axios from "axios";

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true, // Crucial for CSRF protection
  withXSRFToken: true,
  xsrfCookieName: "XSRF-TOKEN", // Correct cookie name
  xsrfHeaderName: "X-XSRF-TOKEN", // Correct header name
  timeout: 10000, // Optional: Set a timeout for requests
});

// Global error handling
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API call error:", error);
    return Promise.reject(error);
  }
);

export default axios;
