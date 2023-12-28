export default class StringUtils {
  public static toCamelCase(str: string) {
    return str
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
  }
  public static formatBalanceString(value: string) {
    let unformatted = value;

    unformatted = unformatted.replace(".", ",");
    unformatted = unformatted.replace(/[^0-9,-]/g, "");

    return unformatted;
  }
}
