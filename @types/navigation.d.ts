export type AppRootParamList = {
  Home: undefined;
  Profile: { token: string | null };
  GoogleLogin: undefined;
  MailLogin: undefined;
  Register: undefined;
  Transactions: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppRootParamList {}
  }
}
