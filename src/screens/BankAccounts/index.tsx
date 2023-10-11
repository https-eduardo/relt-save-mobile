import { FlatList, ListRenderItemInfo, ScrollView, View } from "react-native";
import { styles } from "./styles";
import Header from "../../components/Header";
import { BankAccount } from "../../shared/interfaces";
import BankAccountCard from "../../components/BankAccounts/BankAccountCard";
import { useCallback, useEffect, useState } from "react";
import { BankAccountsService } from "../../services/bank-accounts";
import BankAccountFloatingButton from "../../components/BankAccounts/BankAccountFloatingButton";
import { layoutStyles } from "../../shared/styles/layout.styles";
import { useIsFocused } from "@react-navigation/native";

export default function BankAccountsScreen() {
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const isFocused = useIsFocused();

  function renderItem({ item }: ListRenderItemInfo<BankAccount>) {
    return <BankAccountCard bankAccount={item} />;
  }

  const fetchBankAccounts = useCallback(async () => {
    try {
      const bankAccounts = await BankAccountsService.getBankAccounts();
      setBankAccounts(bankAccounts);
    } catch {}
  }, []);

  useEffect(() => {
    fetchBankAccounts();
  }, [fetchBankAccounts, isFocused]);

  return (
    <View style={styles.bankAccountsContainer}>
      <Header>
        <Header.Title>Suas contas</Header.Title>
      </Header>
      <View style={layoutStyles.list}>
        <FlatList
          data={bankAccounts}
          keyExtractor={(_, idx) => idx.toString()}
          renderItem={renderItem}
        />
      </View>
      <BankAccountFloatingButton />
    </View>
  );
}
