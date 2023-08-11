import api from ".";

export class OAuthService {
  private static GOOGLE_OAUTH = "https://www.googleapis.com/oauth2/v2";

  public static async getUserInfoFromGoogle(accessToken: string) {
    const { data } = await api.get(
      `${this.GOOGLE_OAUTH}/userinfo?alt=json&access_token=${accessToken}`
    );
    return data;
  }
}
