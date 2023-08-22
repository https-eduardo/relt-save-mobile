import axios from "axios";

const api = axios.create({
  baseURL: "https://f9f5-45-176-69-251.ngrok-free.app",
});

export default api;
