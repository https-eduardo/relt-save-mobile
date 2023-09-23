import { Category } from "./category.interface";

export interface Transaction {
  id: number;
  name: string;
  description: string;
  value: number;
  categories: Category[];
  installments: number;
  paid_at: Date | null;
  created_at: string;
}

export type TransactionType = "expenses" | "incomes";

export interface TransactionsFilter {
  minDate?: Date;
  maxDate?: Date;
  categoryId?: number;
  paid?: boolean;
  type?: TransactionType;
}
