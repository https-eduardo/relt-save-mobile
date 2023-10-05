import axios from "axios";

const api = axios.create({
  baseURL: "https://5ba2-45-176-69-254.ngrok-free.app",
});

export function setDefaultBearerToken(accessToken: string) {
  api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
}

export default api;
