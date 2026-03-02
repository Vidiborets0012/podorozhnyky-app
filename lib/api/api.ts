// import axios from "axios";

// export const api = axios.create({
//   // baseURL: "http://localhost:3000",
//   baseURL: "/api",
//   //process.env.NEXT_PUBLIC_API_URL
//   // baseURL: "https://fullstack-120-project-group-1-backend.onrender.com/",
//   withCredentials: true,
// });

import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
