import { Transaction } from "./transaction.interface";

export interface Charge {
  id: number;
  due_date: Date;
  paid_at: Date;
  transaction?: Transaction;
}
