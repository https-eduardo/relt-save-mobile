import { Text, View } from "react-native";
import Header from "../../Header";
import Avatar from "../../Avatar";
import { styles } from "./styles";
import UserContext from "../../../contexts/auth";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import MonthResumeCard from "./MonthResumeCard";
import { COLORS } from "../../../theme";
import { BankAccountsService } from "../../../services/bank-accounts";
import { BankAccount, Transaction } from "../../../shared/interfaces";
import { NumberUtils } from "../../../utils/number";
import { TransactionsService } from "../../../services/transactions";
import GlobalContext from "../../../contexts/global";
import { DateUtils } from "../../../utils/date";

export default function SummaryHeader() {
  const { user } = useContext(UserContext);
  const { period } = useContext(GlobalContext);
  const [bankAccountsBalance, setBankAccountsBalance] = useState(0);
  const [monthIncomes, setMonthIncomes] = useState(0);
  const [monthExpenses, setMonthExpenses] = useState(0);

  const firstName = useMemo(() => {
    return user?.name.split(" ")[0];
  }, [user?.name]);

  function getTotalBalance(bankAccounts: BankAccount[]) {
    const balances = bankAccounts.map((bankAccount) => bankAccount.balance);
    if (balances.length === 0) return 0;
    return balances.reduce((prev, curr) => prev + curr);
  }

  function getTransactionsTotalValue(transactions: Transaction[]) {
    const values = transactions.map((transaction) => transaction.value);
    if (values.length === 0) return 0;
    return values.reduce((prev, curr) => prev + curr);
  }

  const fetchBankAccountsBalance = useCallback(async () => {
    try {
      const bankAccounts = await BankAccountsService.getBankAccounts();
      setBankAccountsBalance(getTotalBalance(bankAccounts));
    } catch {}
  }, [period]);

  const fetchIncomesValue = useCallback(async () => {
    try {
      const transactions = await TransactionsService.getTransactions({
        type: "incomes",
        minDate: period,
        maxDate: DateUtils.getMonthMaxDate(period),
      });
      setMonthIncomes(getTransactionsTotalValue(transactions));
    } catch {}
  }, [period]);

  const fetchExpensesValue = useCallback(async () => {
    try {
      const transactions = await TransactionsService.getTransactions({
        type: "expenses",
        minDate: period,
        maxDate: DateUtils.getMonthMaxDate(period),
      });
      setMonthExpenses(getTransactionsTotalValue(transactions));
    } catch {}
  }, [period]);

  const totalBalance = useMemo(() => {
    return NumberUtils.formatValue(bankAccountsBalance);
  }, [bankAccountsBalance]);

  const formattedMonthIncomes = useMemo(() => {
    return NumberUtils.formatValue(monthIncomes);
  }, [monthIncomes]);

  const formattedMonthExpenses = useMemo(() => {
    return NumberUtils.formatValue(monthExpenses);
  }, [monthExpenses]);

  useEffect(() => {
    fetchBankAccountsBalance();
    fetchIncomesValue();
    fetchExpensesValue();
  }, [period]);

  return (
    <Header periodSelector>
      <View style={styles.profileContainer}>
        <Header.Title>Olá, {firstName}</Header.Title>
        <Avatar url={user?.profile_url} style={styles.profile} />
      </View>
      <View style={styles.balanceContainer}>
        <View>
          <Text style={styles.balanceTotalTitle}>Saldo das contas</Text>
          <Text style={styles.balanceTotalValue}>R$ {totalBalance}</Text>
        </View>
        <View style={styles.monthTransactionsResume}>
          <MonthResumeCard
            icon="trending-up"
            title="Receitas"
            value={`R$ ${formattedMonthIncomes}`}
            color={COLORS.bgGreen}
          />
          <MonthResumeCard
            icon="trending-down"
            title="Despesas"
            value={`R$ ${formattedMonthExpenses}`}
            color={COLORS.bgRed}
          />
        </View>
      </View>
    </Header>
  );
}
