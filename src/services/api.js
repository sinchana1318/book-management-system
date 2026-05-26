import axios from "axios";

const API = axios.create({
  baseURL: "https://6a15f24991ff9a63de0902ca.mockapi.io",
});

export default API;