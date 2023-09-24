import { Card } from './card.interface';

export interface BankAccount {
  id: number;
  name: string;
  balance: number;
  cards?: Card[];
}