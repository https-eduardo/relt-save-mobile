import { BankAccount } from "./bank-account.interface";

export interface Card {
  id: number;
  name: string;
  final_numbers: string;
  type: CardType;
  bank_account?: BankAccount;
}

export type CardType = "DEBIT" | "CREDIT";
