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
  public static async getTransaction(transactionId: number) {
    const { data } = await api.get(`transactions/${transactionId}`);

    return data;
  }
  public static async create(transactionData: TransactionData) {
    const { data } = await api.post("transactions", transactionData);

    return data;
  }
  public static async updateById(
    id: number,
    transactionData: Partial<TransactionData>
  ) {
    const { data } = await api.patch(`transactions/${id}`, transactionData);

    return data;
  }
  public static async deleteById(id: number) {
    const { data } = await api.delete(`transactions/${id}`);

    return data;
  }
}
