import { Category } from "../shared/interfaces";
import { Transaction } from "../shared/interfaces/transaction.interface";
import { COLORS } from "../theme";
import { NumberUtils } from "./number";
import StringUtils from "./string";

export class TransactionUtils {
  public static getBadges(transaction: Transaction) {
    const badges: Record<string, any>[] = [...transaction.categories];

    const isPaid = transaction.charges.every((charge) => charge.paid_at);

    if (isPaid) badges.push({ color: COLORS.bgGreen, name: "Pago" });
    else badges.push({ color: COLORS.bgRed, name: "Pendente" });

    const card = transaction.card;
    if (card) badges.push({ color: COLORS.yellow, name: card.name });

    const installment = { color: COLORS.primary, name: "Movimentação fixa" };
    if (transaction.installments > 1) installment.name = "Parcelado";
    else if (transaction.installments === 1) installment.name = "À vista";

    badges.push(installment);
    return badges;
  }

  public static getTransactionValues(transaction: Transaction) {
    if (!transaction) return;
    const transactionValues: Record<string, any> = {};

    for (const key in transaction) {
      let valueKey = key;
      let value = transaction[key as keyof Transaction] as any;
      if (key === "value")
        value = `R$ ${NumberUtils.formatValue(value as number, "never")}`;
      if (value && (key === "paid_at" || key === "due_date")) {
        valueKey = "payment_date";
        value = new Date(value as Date);
      }
      if (value && key === "categories")
        value = (value as Category[]).map((category) => Number(category.id));

      transactionValues[StringUtils.toCamelCase(valueKey)] = value;
    }

    return transactionValues;
  }
}
