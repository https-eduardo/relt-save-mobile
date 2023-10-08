import api from ".";
import { BankAccount } from "../shared/interfaces";

export class BankAccountsService {
  public static async getBankAccounts(): Promise<BankAccount[]> {
    const { data } = await api.get("bank-accounts");

    return data;
  }
}
