import { FlatList, ListRenderItemInfo, Text, View } from "react-native";
import { styles } from "./styles";
import SummaryAlert from "./SummaryAlert";
import { COLORS } from "../../../theme";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { TransactionsService } from "../../../services/transactions";
import GlobalContext from "../../../contexts/global";
import { DateUtils } from "../../../utils/date";
import { BankAccount, Charge } from "../../../shared/interfaces";
import { BankAccountsService } from "../../../services/bank-accounts";
import { ChargesService } from "../../../services/charges";

export default function SummaryAlertsCard() {
  const { period } = useContext(GlobalContext);
  const [pendingIncomesValue, setPendingIncomesValue] = useState(0);
  const [pendingExpensesValue, setPendingExpensesValue] = useState(0);
  const [bankAccountsBalance, setBankAccountsBalance] = useState(0);

  function getTotalBalance(bankAccounts: BankAccount[]) {
    const balances = bankAccounts.map((bankAccount) => bankAccount.balance);
    if (balances.length === 0) return 0;
    return balances.reduce((prev, curr) => prev + curr);
  }

  const fetchPendingIncomesValue = useCallback(async () => {
    const incomes = await ChargesService.getChargesValueResume({
      minDate: period,
      maxDate: DateUtils.getMonthMaxDate(period),
      paid: false,
      type: "incomes",
    });
    setPendingIncomesValue(incomes.value);
  }, [period]);

  const fetchPendingExpensesValue = useCallback(async () => {
    const expenses = await ChargesService.getChargesValueResume({
      minDate: period,
      maxDate: DateUtils.getMonthMaxDate(period),
      paid: false,
      type: "expenses",
    });
    setPendingExpensesValue(expenses.value);
  }, [period]);

  const fetchBankAccountsBalance = useCallback(async () => {
    try {
      const bankAccounts = await BankAccountsService.getBankAccounts();
      setBankAccountsBalance(getTotalBalance(bankAccounts));
    } catch {}
  }, [period]);

  useEffect(() => {
    fetchPendingIncomesValue();
    fetchPendingExpensesValue();
    fetchBankAccountsBalance();
  }, [period]);

  const finalBalance = useMemo(() => {
    return bankAccountsBalance + pendingIncomesValue + pendingExpensesValue;
  }, [bankAccountsBalance, pendingExpensesValue, pendingIncomesValue]);

  return (
    <View style={styles.alertsCardWrapper}>
      <Text style={styles.alertsCardTitle}>Alertas</Text>
      <View style={styles.alertsCardContainer}>
        <SummaryAlert
          title="Receitas pendentes"
          subtitle="Receitas ainda não recebidas."
          value={pendingIncomesValue}
        />
        <SummaryAlert
          title="Despesas pendentes"
          subtitle="Despesas que ainda não foram pagas."
          value={pendingExpensesValue}
        />
        <SummaryAlert
          title="Saldo final estimado"
          subtitle="Saldo após pagamento de pendências."
          value={finalBalance}
          valueStyle={{ color: COLORS.black }}
        />
      </View>
    </View>
  );
}
