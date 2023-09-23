import { Text, View } from "react-native";
import { styles } from "./styles";
import { DateUtils } from "../../../utils/date";
import { useMemo } from "react";
import { NumberUtils } from "../../../utils/number";
import { Transaction } from "../../../shared/interfaces/transaction.interface";
import TransactionCardBadge from "../../AppBadge";
import { COLORS } from "../../../theme";

interface TransactionCardProps {
  transaction: Transaction;
}

export default function TransactionCard({ transaction }: TransactionCardProps) {
  const createdAt = useMemo(
    () => DateUtils.formatDate(new Date(transaction.created_at)),
    [transaction.created_at]
  );
  const valueStyle = useMemo(() => {
    return transaction.value < 0 ? styles.expense : styles.income;
  }, [transaction.value]);

  const value = useMemo(() => {
    return NumberUtils.formatPrice(transaction.value);
  }, [transaction.value]);

  function getTransactionBadges() {
    const badges: Record<string, any>[] = [];

    if (transaction.paid_at)
      badges.push({ color: COLORS.bgGreen, name: "Pago" });
    else badges.push({ color: COLORS.bgRed, name: "Pendente" });

    const installment = { color: COLORS.primary, name: "Movimentação fixa" };
    if (transaction.installments > 1) installment.name = "Parcelado";
    else if (transaction.installments === 1) installment.name = "À vista";

    badges.push(installment);
    return badges;
  }

  const badges = useMemo(() => {
    const transactionBadges: Record<string, any>[] = [
      ...transaction.categories,
      ...getTransactionBadges(),
    ];

    return transactionBadges;
  }, [transaction.categories]);

  return (
    <View style={styles.card}>
      <View style={styles.mainRow}>
        <Text style={styles.title}>{transaction.name}</Text>
        <Text style={styles.description}>{transaction.description}</Text>
        <View style={styles.badges}>
          {badges?.map((category, idx) => {
            return (
              <TransactionCardBadge
                key={idx}
                color={category.color}
                text={category.name}
              />
            );
          })}
        </View>
      </View>
      <View style={styles.valueRow}>
        <Text style={[styles.valueText, valueStyle]}>R$ {value}</Text>
        <Text style={styles.createdDateText}>{createdAt}</Text>
      </View>
    </View>
  );
}
