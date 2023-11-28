import {
  BankAccountDetailsProps,
  TransactionFormProps,
  BankAccountFormProps,
} from "../src/shared/interfaces";

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
  BankAccountsRegister: BankAccountFormProps;
  BankCardRegister: CardFormProps;
  BankAccount: BankAccountDetailsProps;
  Transaction: TransactionScreenProps;
  MailLogin: undefined;
  Register: undefined;
  Transactions: undefined;
  BankAccounts: undefined;
  Settings: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppRootParamList {}
  }
}
