import { Text, View } from "react-native";
import { Transaction } from "../../../shared/interfaces";
import ReturnIcon from "../../ReturnIcon";
import { DateUtils } from "../../../utils/date";
import { useMemo } from "react";
import { NumberUtils } from "../../../utils/number";
import { transactionsStyles } from "../../../shared/styles/transaction.styles";
import { TransactionUtils } from "../../../utils/transaction";
import { styles } from "./styles";
import AppBadge from "../../AppBadge";

interface TransactionHeaderProps {
  transaction: Transaction;
}

export default function TransactionHeader({
  transaction,
}: TransactionHeaderProps) {
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
    return transaction.value < 0
      ? transactionsStyles.expense
      : transactionsStyles.income;
  }, [transaction.value]);

  const value = useMemo(() => {
    return NumberUtils.formatValue(transaction.value);
  }, [transaction.value]);

  const badges = useMemo(() => {
    return TransactionUtils.getBadges(transaction);
  }, [transaction.categories]);

  return (
    <View style={styles.transactionHeader}>
      <ReturnIcon />
      <View style={styles.headerContent}>
        <View style={styles.mainRow}>
          <Text style={styles.title}>{transaction.name}</Text>
          <Text style={styles.description}>{transaction.description}</Text>
          <View style={styles.badges}>
            {badges?.map((category, idx) => {
              return (
                <AppBadge
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
          <Text style={styles.dateText}>{createdAt}</Text>
          {transaction.due_date && <Text>{dueDate}</Text>}
        </View>
      </View>
    </View>
  );
}
