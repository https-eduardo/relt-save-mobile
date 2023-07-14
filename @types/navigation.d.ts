export type AppRootParamList = {
  Home: undefined;
  Profile: { token: string | null };
  GoogleLogin: undefined;
  MailLogin: undefined;
  Transactions: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppRootParamList {}
  }
}
