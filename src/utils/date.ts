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
  public static getMonthMaxDate(period: Date) {
    const month = period.getUTCMonth() + 1;
    const year = period.getUTCFullYear();
    const date = new Date(year, month, 0);
    date.setUTCHours(23, 59, 59);
    return date;
  }
}
