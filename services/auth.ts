import api from "./api";

async function getProfileByAccessToken(accessToken: string) {
  return api.get("auth/google/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

async function refreshAccessToken(refreshToken: string) {
  return api.post("auth/google/refresh", { refreshToken });
}

export { getProfileByAccessToken, refreshAccessToken };
