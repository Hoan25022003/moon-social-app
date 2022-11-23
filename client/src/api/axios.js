import axios from "axios";

const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8080/api"
    : "some-url";

export default axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
    Authorization: sessionStorage.getItem("token"),
  },
  responseType: "json",
});
