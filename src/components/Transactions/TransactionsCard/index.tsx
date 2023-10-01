import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { DateUtils } from "../../../utils/date";
import { useMemo } from "react";
import { NumberUtils } from "../../../utils/number";
import { Transaction } from "../../../shared/interfaces/transaction.interface";
import TransactionCardBadge from "../../AppBadge";
import { COLORS } from "../../../theme";
import { TransactionBadges } from "../../../utils/transaction-badges";

interface TransactionCardProps {
  transaction: Transaction;
}

export default function TransactionCard({ transaction }: TransactionCardProps) {
  const createdAt = useMemo(
    () => DateUtils.formatDate(new Date(transaction.created_at)),
    [transaction.created_at]
  );

  const dueDate = useMemo(() => {
    return transaction.due_date
      ? DateUtils.formatDate(new Date(transaction.due_date))
      : null;
  }, [transaction.due_date]);

  const valueStyle = useMemo(() => {
    return transaction.value < 0 ? styles.expense : styles.income;
  }, [transaction.value]);

  const value = useMemo(() => {
    return NumberUtils.formatValue(transaction.value);
  }, [transaction.value]);

  const badges = useMemo(() => {
    return TransactionBadges.getBadges(transaction);
  }, [transaction.categories]);

  return (
    <TouchableOpacity style={styles.card}>
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
        {dueDate && (
          <Text style={styles.createdDateText}>Vence em {dueDate}</Text>
        )}
        <Text style={styles.createdDateText}>Criada em {createdAt}</Text>
      </View>
    </TouchableOpacity>
  );
}
