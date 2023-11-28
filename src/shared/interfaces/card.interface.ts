import { BankAccount } from "./bank-account.interface";

export interface Card {
  id: number;
  name: string;
  final_numbers: string;
  type: CardType;
  bank_account?: BankAccount;
}

export interface CardFormData {
  bankAccountId?: number;
  name: string;
  cardType?: string;
  finalNumbers: string;
}

export interface CardFormProps {
  bankAccountId: number;
}

export type CardType = "DEBIT" | "CREDIT";
