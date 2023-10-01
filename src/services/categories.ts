import api from ".";
import { Category } from "../shared/interfaces/category.interface";

export class CategoriesService {
  public static async getCategories(): Promise<Category[]> {
    const { data } = await api.get("categories");

    return data;
  }
}
