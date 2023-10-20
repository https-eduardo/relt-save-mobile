import { Text, View } from "react-native";
import { Card } from "../../shared/interfaces";
import { styles } from "./styles";
import AppBadge from "../AppBadge";
import { COLORS } from "../../theme";
import { useMemo } from "react";

interface BankCardProps {
  card: Card;
}

export default function BankCard({ card }: BankCardProps) {
  const cardType = useMemo(() => {
    switch (card.type) {
      case "CREDIT":
        return "Crédito";
      case "DEBIT":
        return "Débito";
    }
  }, [card.type]);

  return (
    <View style={styles.bankCard}>
      <View style={styles.cardNameContainer}>
        <Text style={styles.bankCardName}>{card.name}</Text>
        <AppBadge text={cardType} color={COLORS.primary} />
      </View>
      <View style={styles.cardNumberContainer}>
        <Text style={styles.cardNumberText}>Números finais</Text>
        <Text style={styles.cardNumber}>{card.final_numbers}</Text>
      </View>
    </View>
  );
}
