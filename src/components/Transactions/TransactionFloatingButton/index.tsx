import { View } from "react-native";
import { styles } from "./styles";
import { useState } from "react";
import AppFloatingButton from "../../AppFloatingButton";
import { useNavigation } from "@react-navigation/native";

export default function TransactionFloatingButton() {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const { navigate } = useNavigation();

  function toggleOptionsButtons() {
    setOptionsOpen(!optionsOpen);
  }

  function navigateToIncomeRegister() {
    navigate("TransactionsRegister", { type: "NEW_INCOME" });
  }

  function navigateToExpenseRegister() {
    navigate("TransactionsRegister", { type: "NEW_EXPENSE" });
  }

  return (
    <View style={styles.transactionsFloatingButtons}>
      <AppFloatingButton
        icon="add-outline"
        onPress={toggleOptionsButtons}
        primary
        style={{ transform: optionsOpen ? [{ rotate: "45deg" }] : [] }}
      />
      <View
        style={[
          styles.transactionsOptions,
          { display: optionsOpen ? "flex" : "none" },
        ]}
      >
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
      </View>
    </View>
  );
}
