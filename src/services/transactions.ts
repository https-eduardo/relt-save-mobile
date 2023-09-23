import api from ".";
import {
  Transaction,
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
  // public static async create() {
  //   const { data } = await api.post("transactions");

  //   return data;
  // }
}
