export interface OAuthResponse {
  type: string;
  params: {
    access_token: string;
    refresh_token: string;
  };
  url: string;
}