import api from ".";
import {
  Category,
  CategoryData,
} from "../shared/interfaces/category.interface";

export class CategoriesService {
  public static async create(categoryData: CategoryData): Promise<Category> {
    const { data } = await api.post("categories", categoryData);

    return data;
  }

  public static async delete(id: number) {
    const { data } = await api.delete(`categories/${id}`);

    return data;
  }

  public static async getAll(): Promise<Category[]> {
    const { data } = await api.get("categories");

    return data;
  }
}
