export class NumberUtils {
  public static formatPrice(value: number) {
    return Intl.NumberFormat("pt-BR", {
      signDisplay: "always",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }
}
