import { Text, View } from "react-native";
import Header from "../../components/Header";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import { TransactionsService } from "../../services/transactions";
import { Transaction } from "../../shared/interfaces/transaction.interface";
import { useContext, useEffect, useState } from "react";
import TransactionCard from "../../components/Transactions/TransactionsCard";
import TransactionsSearch from "../../components/Transactions/TransactionSearch";
import TransactionsContext from "../../contexts/transactions";
import Ionicon from "@expo/vector-icons/Ionicons";
import AppButton from "../../components/AppButton";
import TransactionFloatingButton from "../../components/Transactions/TransactionFloatingButton";

export default function TransactionsScreen() {
  const [transactionsByDay, setTransactionsByDay] =
    useState<[string, Transaction[]][]>();

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
    setTransactionsByDay(Object.entries(transactionsByDay));
  }
  const navigation = useNavigation();

  useEffect(() => {
    fetchTransactions();
  }, [filters]);

  return (
    <View style={styles.transactionsContainer}>
      <Header periodSelector>
        <Header.Title>Suas movimentações</Header.Title>
        <TransactionsSearch style={styles.transactionsSearch} />
      </Header>
      <View style={styles.transactionsList}>
        {transactionsByDay?.map(([day, transactions]) => {
          return (
            <View style={styles.transactionsByDayContainer} key={day}>
              <Text style={styles.transactionsDayTitle}>Dia {day}</Text>
              <View style={styles.transactionsDayList}>
                {transactions.map((transaction) => {
                  return (
                    <TransactionCard
                      key={transaction.id}
                      transaction={transaction}
                    />
                  );
                })}
              </View>
            </View>
          );
        })}
      </View>
      <TransactionFloatingButton />
    </View>
  );
}
