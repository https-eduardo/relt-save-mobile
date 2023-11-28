import api from ".";
import {
  ChargeBalanceByCategory,
  ChargeFilter,
  ChargesBalanceData,
} from "../shared/interfaces";
import {
  Transaction,
  TransactionsFilter,
} from "../shared/interfaces/transaction.interface";
import qs from "query-string";

export class ChargesService {
  public static async getChargesValueResume(
    filters: TransactionsFilter
  ): Promise<ChargesBalanceData> {
    const filterQuery = qs.stringify(filters, { skipEmptyString: true });
    const { data } = await api.get(`charges?${filterQuery}`);

    return data;
  }

  public static async getChargesBalanceByCategory(
    filters: ChargeFilter
  ): Promise<ChargeBalanceByCategory[]> {
    const filterQuery = qs.stringify(filters, { skipEmptyString: true });
    const { data } = await api.get(`charges/balance?${filterQuery}`);

    return data;
  }

  public static async markAsPaid(id: number, paid?: boolean) {
    const paidAt = paid ? new Date() : null;
    const { data } = await api.patch(`charges/${id}`, { paidAt });

    return data;
  }
}
