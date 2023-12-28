import api from ".";
import { Card, CardFormData } from "../shared/interfaces";

export class CardsService {
  public static async getUserCards(): Promise<Card[]> {
    const { data } = await api.get("cards");

    return data;
  }
  public static async create(body: CardFormData) {
    const { data } = await api.post("cards", body);

    return data;
  }
  public static async delete(id: number) {
    const { data } = await api.delete(`cards/${id}`);

    return data;
  }
}
