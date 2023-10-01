import { NumberUtils } from "./number";

export class DateUtils {
  public static formatDate(date: Date) {
    const [day, month, year] = NumberUtils.formatZeros(
      date.getDate(),
      date.getMonth() + 1,
      date.getFullYear()
    );

    return `${day}/${month}/${year}`;
  }
}
