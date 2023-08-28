export class DateUtils {
  private static formatZeros(...numbers: number[]) {
    return numbers.map((n) => (n <= 9 ? '0' + n : n.toString()));
  }
  public static formatDate(date: Date) {
    const [day, month, year] = this.formatZeros(date.getDate(), date.getMonth(), date.getFullYear());

    return `${day}/${month}/${year}`;
  }
}