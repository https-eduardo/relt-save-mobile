import { FlatList, ListRenderItemInfo, Text, View } from "react-native";
import { useCallback, useMemo, useState, useEffect } from "react";
import {
  BankAccount,
  BankAccountDetailsProps,
  Card,
} from "../../../shared/interfaces";
import { useNavigation, useRoute } from "@react-navigation/native";
import { BankAccountsService } from "../../../services/bank-accounts";
import BankAccountHeader from "../../../components/BankAccounts/BankAccountHeader";
import { styles } from "./styles";
import BankCard from "../../../components/BankCard";

export default function BankAccountDetailsScreen() {
  const [bankAccount, setBankAccount] = useState<BankAccount | null>(null);
  const route = useRoute();
  const navigation = useNavigation();

  const params = useMemo(
    () => route.params as BankAccountDetailsProps,
    [route.params]
  );

  const fetchBankAccount = useCallback(async () => {
    try {
      const transactionData = await BankAccountsService.getBankAccount(
        params.bankAccountId
      );
      setBankAccount(transactionData);
    } catch {
      navigation.goBack();
    }
  }, []);

  useEffect(() => {
    fetchBankAccount();
  }, []);

  if (!bankAccount) return null;

  function renderAccountCard({ item }: ListRenderItemInfo<Card>) {
    return <BankCard card={item} />;
  }

  return (
    <View style={styles.bankAccountScreen}>
      <BankAccountHeader bankAccount={bankAccount} />
      <View style={styles.cardsList}>
        <Text style={styles.cardsTitle}>Cartões</Text>
        <FlatList
          data={bankAccount.cards}
          keyExtractor={(_, idx) => idx.toString()}
          renderItem={renderAccountCard}
        />
      </View>
    </View>
  );
}
