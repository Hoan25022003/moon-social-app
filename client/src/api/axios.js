import axios from "axios";
import { io } from "socket.io-client";

const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8080"
    : "https://moon-stars.onrender.com";

// http://localhost:8080

export const socket = io(apiUrl);

export default axios.create({
  baseURL: apiUrl + "/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: sessionStorage.getItem("token"),
  },
  responseType: "json",
});
