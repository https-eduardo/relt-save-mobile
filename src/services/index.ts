import axios from "axios";

const api = axios.create({
  baseURL: "https://c3f5-45-176-69-229.ngrok-free.app",
});

export function setDefaultBearerToken(accessToken: string) {
  api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
}

export default api;
