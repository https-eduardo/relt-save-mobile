import { Transaction } from "../shared/interfaces/transaction.interface";
import { COLORS } from "../theme";

export class TransactionBadges {
  public static getBadges(transaction: Transaction) {
    const badges: Record<string, any>[] = [...transaction.categories];

    if (transaction.paid_at)
      badges.push({ color: COLORS.bgGreen, name: "Pago" });
    else badges.push({ color: COLORS.bgRed, name: "Pendente" });

    const card = transaction.card;
    if (card) badges.push({ color: COLORS.yellow, name: card.name });

    const installment = { color: COLORS.primary, name: "Movimentação fixa" };
    if (transaction.installments > 1) installment.name = "Parcelado";
    else if (transaction.installments === 1) installment.name = "À vista";

    badges.push(installment);
    return badges;
  }
}
