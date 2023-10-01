import api from ".";
import {
  Transaction,
  TransactionData,
  TransactionsFilter,
} from "../shared/interfaces/transaction.interface";
import qs from "query-string";

export class TransactionsService {
  public static async getTransactions(
    filters: TransactionsFilter
  ): Promise<Transaction[]> {
    const filterQuery = qs.stringify(filters, { skipEmptyString: true });
    const { data } = await api.get(`transactions?${filterQuery}`);

    return data;
  }
  public static async create(transactionData: TransactionData) {
    const { data } = await api.post("transactions", transactionData);

    return data;
  }
}
