import api from ".";
import { BankAccount, BankAccountData } from "../shared/interfaces";

export class BankAccountsService {
  public static async getBankAccounts(): Promise<BankAccount[]> {
    const { data } = await api.get("bank-accounts");

    return data;
  }
  public static async getBankAccount(
    bankAccountId: number
  ): Promise<BankAccount> {
    const { data } = await api.get(`bank-accounts/${bankAccountId}`);

    return data;
  }
  public static async create(bankAccountData: BankAccountData) {
    const { data } = await api.post("bank-accounts", bankAccountData);

    return data;
  }
  public static async updateById(
    bankAccountId: number,
    bankAccountData: BankAccountData
  ) {
    const { data } = await api.patch(
      `bank-accounts/${bankAccountId}`,
      bankAccountData
    );

    return data;
  }
}
