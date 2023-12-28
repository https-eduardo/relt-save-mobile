import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { DateUtils } from "../../../utils/date";
import { useMemo } from "react";
import { NumberUtils } from "../../../utils/number";
import { Transaction } from "../../../shared/interfaces/transaction.interface";
import AppBadge from "../../AppBadge";
import { COLORS } from "../../../theme";
import { TransactionUtils } from "../../../utils/transaction";
import { numberStyles } from "../../../shared/styles/numbers.styles";
import { useNavigation } from "@react-navigation/native";

interface TransactionCardProps {
  transaction: Transaction;
}

export default function TransactionCard({ transaction }: TransactionCardProps) {
  const { navigate } = useNavigation();
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
    return transaction.value < 0 ? numberStyles.expense : numberStyles.income;
  }, [transaction.value]);

  const value = useMemo(() => {
    return NumberUtils.formatValue(transaction.value);
  }, [transaction.value]);

  const badges = useMemo(() => {
    return TransactionUtils.getBadges(transaction);
  }, [transaction.categories]);

  function navigateToTransaction() {
    navigate("Transaction", { transactionId: transaction.id });
  }

  return (
    <TouchableOpacity style={styles.card} onPress={navigateToTransaction}>
      <View style={styles.mainRow}>
        <Text style={styles.title}>{transaction.name}</Text>
        <Text style={styles.description}>{transaction.description}</Text>
        <View style={styles.badges}>
          {badges?.map((category, idx) => {
            return (
              <AppBadge key={idx} color={category.color} text={category.name} />
            );
          })}
        </View>
      </View>
      <View style={styles.valueRow}>
        <Text style={[numberStyles.valueText, valueStyle]}>R$ {value}</Text>
        {dueDate && (
          <Text style={styles.createdDateText}>Vence em {dueDate}</Text>
        )}
        <Text style={styles.createdDateText}>Criada em {createdAt}</Text>
      </View>
    </TouchableOpacity>
  );
}
