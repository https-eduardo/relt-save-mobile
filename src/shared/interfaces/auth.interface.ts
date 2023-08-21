export interface RecoverPasswordData {
  email: string;
  recoveryCode: string;
  password: string;
  confirmPassword: string;
}

export interface LoginData {
  email: string;
  password: string;
}
