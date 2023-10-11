import { Bank } from "./bank.interface";
import { Card } from "./card.interface";

export interface BankAccount {
  id: number;
  name: string;
  balance: number;
  cards?: Card[];
  bank: Bank;
}

export interface BankAccountFormProps {
  type: BankAccountFormType;
  bankAccount?: BankAccount;
}

export type BankAccountFormType = "NEW" | "EDIT";

export interface BankAccountFormData {
  bankAccountId?: number;
  name: string;
  balance: string;
  bankId: number;
}

export interface BankAccountData {
  bankAccountId?: number;
  name: string;
  balance: number;
  bankId: number;
}
