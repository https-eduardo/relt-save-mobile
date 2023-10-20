import { useMemo } from "react";
import { BankAccount } from "../../../shared/interfaces";
import { NumberUtils } from "../../../utils/number";
import { numberStyles } from "../../../shared/styles/numbers.styles";
import { DateUtils } from "../../../utils/date";
import ReturnIcon from "../../ReturnIcon";
import Header from "../../Header";
import { Text, View } from "react-native";
import { styles } from "./styles";

interface BankAccountHeaderProps {
  bankAccount: BankAccount;
}

export default function BankAccountHeader({
  bankAccount,
}: BankAccountHeaderProps) {
  const balance = useMemo(
    () => NumberUtils.formatValue(bankAccount.balance),
    [bankAccount?.balance]
  );

  const createdAt = useMemo(() => {
    if (!bankAccount) return null;
    return DateUtils.formatDate(new Date(bankAccount.created_at));
  }, [bankAccount?.created_at]);

  const valueStyle = useMemo(() => {
    const accountBalance = bankAccount?.balance;
    return accountBalance < 0 ? numberStyles.expense : numberStyles.income;
  }, [bankAccount?.balance]);

  if (!bankAccount) return null;

  return (
    <View style={styles.bankAccountHeader}>
      <ReturnIcon />
      <View style={styles.headerContent}>
        <View>
          <Text style={styles.bankAccountTitle}>{bankAccount.name}</Text>
          <Text style={styles.bankAccountDate}>Registrado em {createdAt}</Text>
        </View>
        <View>
          <Text style={styles.balanceTitle}>Saldo da conta</Text>
          <Text style={[styles.balanceValue, valueStyle]}>R$ {balance}</Text>
        </View>
      </View>
    </View>
  );
}
