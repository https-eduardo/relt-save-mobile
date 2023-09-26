import { View } from "react-native";
import AppButton from "../../AppButton";
import Ionicon from "@expo/vector-icons/Ionicons";
import { styles } from "./styles";
import { useState } from "react";
import FloatingButton from "./FloatingButton";
import { useNavigation } from "@react-navigation/native";

export default function TransactionFloatingButton() {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const { navigate } = useNavigation();

  function toggleOptionsButtons() {
    setOptionsOpen(!optionsOpen);
  }

  function navigateToIncomeRegister() {
    // navigate('TransactionsIncomeRegister')
  }

  function navigateToExpenseRegister() {
    // navigate('TransactionsExpenseRegister')
  }

  return (
    <View style={styles.transactionsFloatingButtons}>
      <FloatingButton
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
        <FloatingButton
          buttonStyle={styles.transactionsOptionButton}
          icon="wallet-outline"
          textStyle={styles.incomesFloatingButton}
          onPress={navigateToIncomeRegister}
          label="Nova receita"
        />
        <FloatingButton
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
