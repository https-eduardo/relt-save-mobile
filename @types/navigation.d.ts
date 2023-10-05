import { TransactionFormProps } from '../src/shared/interfaces';

export interface RecoveryCodeRouteProps {
  email: string;
}

export interface RecoverPasswordRouteProps {
  email: string;
  recoveryCode: string;
}

export type AppRootParamList = {
  Home: undefined;
  Profile: undefined;
  GoogleLogin: undefined;
  ForgotPassword: undefined;
  RecoveryCode: RecoveryCodeRouteProps;
  RecoverPassword: RecoverPasswordRouteProps;
  TransactionsRegister: TransactionFormProps;
  MailLogin: undefined;
  Register: undefined;
  Transactions: undefined;
  Settings: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppRootParamList {}
  }
}
