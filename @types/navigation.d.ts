export interface RecoveryCodeRouteProps {
  email: string;
}

export interface RecoverPasswordRouteProps {
  email: string;
  recoveryCode: string;
}

export type AppRootParamList = {
  Home: undefined;
  Profile: { token: string | null };
  GoogleLogin: undefined;
  ForgotPassword: undefined;
  RecoveryCode: RecoveryCodeRouteProps;
  RecoverPassword: RecoverPasswordRouteProps;
  MailLogin: undefined;
  Register: undefined;
  Transactions: undefined;
  Settings: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppRootParamList { }
  }
}
