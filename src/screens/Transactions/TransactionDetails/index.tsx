import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Transaction,
  TransactionDetailsScreenProps,
} from "../../../shared/interfaces";
import { useCallback, useEffect, useMemo, useState } from "react";
import { TransactionsService } from "../../../services/transactions";
import { Text, View } from "react-native";
import TransactionHeader from "../../../components/Transactions/TransactionHeader";
import { styles } from "./styles";
import ChargesList from "../../../components/Charges/ChargesList";
import { NumberUtils } from "../../../utils/number";
import TransactionDetailsFloatingButton from "../../../components/Transactions/TransactionDetailsFloatingButton";

export default function TransactionDetailsScreen() {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const route = useRoute();
  const navigation = useNavigation();

  const params = useMemo(
    () => route.params as TransactionDetailsScreenProps,
    [route.params]
  );

  const fetchTransaction = useCallback(async () => {
    try {
      const transactionData = await TransactionsService.getTransaction(
        params.transactionId
      );
      setTransaction(transactionData);
    } catch {
      navigation.goBack();
    }
  }, []);

  useEffect(() => {
    fetchTransaction();
  }, []);

  const installmentsDisplay = useMemo(() => {
    const paidInstallments = transaction?.charges.filter(
      (charge) => charge.paid_at
    ).length;
    const [paid, total] = NumberUtils.formatZeros(
      paidInstallments ?? 0,
      transaction?.installments ?? 0
    );
    return `(${paid}/${total})`;
  }, [transaction?.charges]);

  return (
    <View style={styles.transactionScreen}>
      {transaction && <TransactionHeader transaction={transaction} />}
      <View style={styles.chargesList}>
        <View style={styles.chargeTitleContainer}>
          <Text style={styles.chargesListTitle}>Registro de pagamentos</Text>
          <Text style={styles.installments}>{installmentsDisplay}</Text>
        </View>
        {transaction && <ChargesList charges={transaction.charges} />}
      </View>
      <TransactionDetailsFloatingButton transaction={transaction} />
    </View>
  );
}
