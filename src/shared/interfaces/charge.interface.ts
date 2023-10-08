import { Transaction } from "./transaction.interface";

export interface Charge {
  id: number;
  due_date: string;
  paid_at: string;
  value: number;
  transaction?: Transaction;
}
