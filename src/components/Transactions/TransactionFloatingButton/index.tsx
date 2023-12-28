import { styles } from "./styles";
import AppFloatingButton from "../../AppFloatingButton";
import { useNavigation } from "@react-navigation/native";
import FloatingButtonGroup from "../../FloatingButtonGroup";

export default function TransactionFloatingButton() {
  const { navigate } = useNavigation();

  function navigateToIncomeRegister() {
    navigate("TransactionsRegister", { type: "NEW_INCOME" });
  }

  function navigateToExpenseRegister() {
    navigate("TransactionsRegister", { type: "NEW_EXPENSE" });
  }

  return (
    <FloatingButtonGroup>
      <AppFloatingButton
        buttonStyle={styles.transactionsOptionButton}
        icon="wallet-outline"
        textStyle={styles.incomesFloatingButton}
        onPress={navigateToIncomeRegister}
        label="Nova receita"
      />
      <AppFloatingButton
        icon="card-outline"
        buttonStyle={styles.transactionsOptionButton}
        onPress={navigateToExpenseRegister}
        textStyle={styles.expensesFloatingButton}
        label="Nova despesa"
      />
    </FloatingButtonGroup>
  );
}
