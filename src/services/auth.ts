import api from ".";

export class AuthService {
  public static async getProfileByAccessToken(accessToken: string) {
    return api.get("auth/google/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
  public static async refreshAccessToken(refreshToken: string) {
    return api.post("auth/google/refresh", { refreshToken });
  }
}
