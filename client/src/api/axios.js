import { apiUrl } from "config/config";

const { default: axios } = require("axios");

export default axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
    Authorization: sessionStorage.getItem("token"),
  },
  responseType: "json",
});
