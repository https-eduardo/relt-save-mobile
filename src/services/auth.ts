import api from ".";

export class AuthService {
  public static async getProfile(accessToken: string) {
    const { data } = await api.get("auth/google/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  }
  
  public static async refreshAccessToken(refreshToken: string) {
    const { data } = await api.post("auth/google/refresh", { refreshToken });
    return data;
  }

  public static async sendPasswordRecoveryCode(email: string) {
    const { data } = await api.put("auth/reset-password", { email });

    return data;
  }
}
