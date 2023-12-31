import { ScrollView, Text, View } from "react-native";
import Header from "../../components/Header";
import { useIsFocused } from "@react-navigation/native";
import { styles } from "./styles";
import { TransactionsService } from "../../services/transactions";
import { Transaction } from "../../shared/interfaces/transaction.interface";
import { useContext, useEffect, useState } from "react";
import TransactionCard from "../../components/Transactions/TransactionsCard";
import TransactionsSearch from "../../components/Transactions/TransactionSearch";
import TransactionsContext from "../../contexts/transactions";
import TransactionFloatingButton from "../../components/Transactions/TransactionFloatingButton";
import { layoutStyles } from "../../shared/styles/layout.styles";

export default function TransactionsScreen() {
  const [transactionsByDay, setTransactionsByDay] =
    useState<[string, Transaction[]][]>();
  const isFocused = useIsFocused();
  const { filters } = useContext(TransactionsContext);

  async function fetchTransactions() {
    const transactions = await TransactionsService.getTransactions(filters);

    const transactionsByDay: Record<number, Transaction[]> = {};
    for (const transaction of transactions) {
      const date = new Date(transaction.created_at);
      const day = date.getDate();

      if (!transactionsByDay[day]) transactionsByDay[day] = [];
      transactionsByDay[day].push(transaction);
    }
    setTransactionsByDay(Object.entries(transactionsByDay).reverse());
  }

  useEffect(() => {
    fetchTransactions();
  }, [filters, isFocused]);

  return (
    <View style={styles.transactionsContainer}>
      <Header periodSelector>
        <Header.Title>Suas movimentações</Header.Title>
        <TransactionsSearch />
      </Header>
      <ScrollView style={layoutStyles.list}>
        {transactionsByDay?.map(([day, transactions]) => (
          <View style={styles.transactionsByDayContainer} key={day}>
            <Text style={styles.transactionsDayTitle}>Dia {day}</Text>
            <View style={styles.transactionsDayList}>
              {transactions.map((transaction) => (
                <TransactionCard
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
      <TransactionFloatingButton />
    </View>
  );
}
