import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { BankAccount } from "../../../shared/interfaces";
import { useMemo } from "react";
import { NumberUtils } from "../../../utils/number";
import { numberStyles } from "../../../shared/styles/numbers.styles";
import Ionicon from "@expo/vector-icons/Ionicons";

interface BankAccountCardProps {
  bankAccount: BankAccount;
  onPress?: () => void;
}

export default function BankAccountCard({
  bankAccount,
  onPress,
}: BankAccountCardProps) {
  const balance = useMemo(
    () => NumberUtils.formatValue(bankAccount.balance),
    [bankAccount.balance]
  );

  const valueStyle = useMemo(() => {
    return bankAccount.balance < 0 ? numberStyles.expense : numberStyles.income;
  }, [bankAccount.balance]);

  const hasCard = useMemo(() => {
    if (!bankAccount.cards) return false;

    return bankAccount.cards.length > 0;
  }, [bankAccount.cards]);

  return (
    <TouchableOpacity style={styles.bankAccountsCard} onPress={onPress}>
      <View style={styles.mainRow}>
        <Text style={styles.bankAccountTitle}>{bankAccount.name}</Text>
        <Text style={styles.balanceTitle}>Saldo da conta</Text>
        <Text style={[styles.balanceValue, valueStyle]}>R$ {balance}</Text>
      </View>
      <View style={styles.bankRow}>
        <Image
          source={{ uri: bankAccount.bank.logo_url }}
          style={styles.bankImg}
        />
        {hasCard && (
          <Text style={styles.cardText}>
            <Ionicon name="card-outline" style={[styles.cardText]} /> Cartão
            incluso
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
