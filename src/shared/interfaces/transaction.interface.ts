import { Card } from "./card.interface";
import { Category } from "./category.interface";
import { Charge } from "./charge.interface";

export interface Transaction {
  id: number;
  name: string;
  description: string;
  value: number;
  categories: Category[];
  installments: number;
  paid_at: Date | null;
  created_at: string;
  card: Card | null;
  due_date: Date | null;
  charges: Charge[];
}

export type TransactionType = "expenses" | "incomes";

export interface TransactionsFilter {
  minDate?: Date;
  maxDate?: Date;
  categoryId?: number;
  paid?: boolean;
  type?: TransactionType;
}

export interface TransactionData {
  name: string;
  description: string;
  value: number;
  dueDate?: Date;
  categories?: number[];
  paymentType: TransactionPaymentType;
  cardId?: number;
  bankAccountId?: number;
  paidAt?: Date;
  installments: number;
}

export interface TransactionFormProps {
  type: TransactionFormType;
  transaction?: Transaction;
}

export interface TransactionDetailsScreenProps {
  transactionId: number;
}

export type TransactionFormType = "NEW_INCOME" | "NEW_EXPENSE" | "EDIT";

export type TransactionPaymentType = "BALANCE" | "PHYSICAL_MONEY" | "CARD";

export interface TransactionFormData {
  name: string;
  description: string;
  value: string;
  categories?: (number | undefined)[];
  paymentDate: Date;
  paymentType: string;
  installments: number;
  bankAccountId?: number;
  cardId?: number;
}
