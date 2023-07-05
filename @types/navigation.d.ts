export type AppRootParamList = {
  Home: undefined;
  Profile: { token: string | null };
  Login: undefined;
  Spendings: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppRootParamList {}
  }
}
