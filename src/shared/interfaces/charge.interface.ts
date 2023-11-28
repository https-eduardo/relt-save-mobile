import { Transaction, TransactionType } from "./transaction.interface";

export interface Charge {
  id: number;
  due_date: string;
  paid_at: string;
  value: number;
  transaction?: Transaction;
}

export interface ChargeFilter {
  minDate?: Date;
  maxDate?: Date;
  paid?: boolean;
  type?: TransactionType;
}

export interface ChargeBalanceByCategory {
  name: string;
  value: number;
  color?: string;
}

export interface ChargesBalanceData {
  value: number;
}
