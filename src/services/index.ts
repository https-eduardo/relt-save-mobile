import axios from "axios";

const api = axios.create({
  baseURL: "https://a648-45-176-69-204.ngrok-free.app",
});

export function setDefaultBearerToken(accessToken: string) {
  api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
}

export default api;
