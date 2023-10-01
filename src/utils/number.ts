export class NumberUtils {
  public static formatZeros(...numbers: number[]) {
    return numbers.map((n) => (n <= 9 ? "0" + n : n.toString()));
  }
  public static formatValue(
    value: number,
    signDisplay: "always" | "never" = "always"
  ) {
    return Intl.NumberFormat("pt-BR", {
      signDisplay,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }

  public static unformat(value: string) {
    let unformatted = value;

    unformatted = unformatted.replaceAll(".", "");
    unformatted = unformatted.replace(",", ".");
    unformatted = unformatted.replace(/[^0-9.]/g, "");

    return Number(unformatted);
  }
}
