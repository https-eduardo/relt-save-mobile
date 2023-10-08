import { Text, TouchableOpacity, View } from "react-native";
import { Charge } from "../../../shared/interfaces";
import { styles } from "./styles";
import { NumberUtils } from "../../../utils/number";
import { transactionsStyles } from "../../../shared/styles/transaction.styles";
import { useMemo } from "react";
import { DateUtils } from "../../../utils/date";

interface ChargeCardProps {
  charge: Charge;
}

export default function ChargeCard({ charge }: ChargeCardProps) {
  const value = useMemo(() => {
    return NumberUtils.formatValue(11);
  }, []);

  const chargePaid = useMemo(() => {
    if (!charge.paid_at) return false;

    return true;
  }, [charge.paid_at, charge.due_date]);

  const date = useMemo(() => {
    return DateUtils.formatDate(
      new Date(chargePaid ? charge.paid_at : charge.due_date)
    );
  }, [charge.paid_at, charge.due_date]);

  const valueStyle = useMemo(() => {
    return charge.value < 0
      ? transactionsStyles.expense
      : transactionsStyles.income;
  }, [charge.value]);

  return (
    <TouchableOpacity style={styles.chargeCard}>
      <View style={styles.mainRow}>
        <Text style={styles.chargeTitle}>Pagamento</Text>
        <Text style={styles.chargeDate}>
          {chargePaid ? "Pago em:" : "Vence em:"} {date}
        </Text>
      </View>
      <View>
        <Text style={[transactionsStyles.valueText, valueStyle]}>
          R$ {value}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
