import api from ".";
import { LoginData, RecoverPasswordData, RegisterData } from "../shared/interfaces";

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
    const { data } = await api.put("auth/reset-password/", { email });

    return data;
  }

  public static async validateRecoveryCode(email: string, code: string) {
    const { data } = await api.post("auth/reset-password/validate-code", {
      email,
      code,
    });

    return data;
  }

  public static async recoverPassword(
    recoverPasswordData: RecoverPasswordData
  ) {
    const { data } = await api.post("auth/reset-password", recoverPasswordData);

    return data;
  }

  public static async login(loginData: LoginData) {
    const { data } = await api.post("auth", loginData);

    return data;
  }

  public static async register(registerData: RegisterData) {
    const { data } = await api.post("users", registerData);

    return data;
  }
}
