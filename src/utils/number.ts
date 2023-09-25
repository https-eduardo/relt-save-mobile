export class NumberUtils {
  public static formatZeros(...numbers: number[]) {
    return numbers.map((n) => (n <= 9 ? "0" + n : n.toString()));
  }
  public static formatPrice(value: number) {
    return Intl.NumberFormat("pt-BR", {
      signDisplay: "always",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }
}
