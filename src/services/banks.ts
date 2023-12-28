import api from ".";
import { Bank } from "../shared/interfaces";

export default class BanksService {
  public static async getBanks(): Promise<Bank[]> {
    const { data } = await api.get("banks");

    return data;
  }
}
