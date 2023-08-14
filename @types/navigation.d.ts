export interface RecoveryCodeRouteProps {
  email: string;
}

export type AppRootParamList = {
  Home: undefined;
  Profile: { token: string | null };
  GoogleLogin: undefined;
  ForgotPassword: undefined;
  RecoveryCode: RecoveryCodeRouteProps;
  MailLogin: undefined;
  Register: undefined;
  Transactions: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppRootParamList {}
  }
}
