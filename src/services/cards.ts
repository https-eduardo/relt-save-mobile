import api from ".";
import { Card } from "../shared/interfaces";

export class CardsService {
  public static async getUserCards(): Promise<Card[]> {
    const { data } = await api.get("cards");

    return data;
  }
}
