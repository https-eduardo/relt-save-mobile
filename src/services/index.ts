import axios, { AxiosError, HttpStatusCode } from "axios";
import * as SecureStore from "expo-secure-store";
import { ACCESS_TOKEN_STORE_KEY, REFRESH_TOKEN_STORE_KEY } from "../constants";
import { API_BASE_URL } from "../constants/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export function setDefaultBearerToken(accessToken: string) {
  api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
}

export default api;
