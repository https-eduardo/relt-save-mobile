import { styles } from "./styles";
import { useState } from "react";
import AppFloatingButton from "../../AppFloatingButton";
import { useNavigation } from "@react-navigation/native";
import FloatingButtonGroup from "../../FloatingButtonGroup";
import { Transaction } from "../../../shared/interfaces";

interface TransactionDetailsFloatingButtonProps {
  transaction: Transaction | null;
}

export default function TransactionDetailsFloatingButton({
  transaction,
}: TransactionDetailsFloatingButtonProps) {
  const { navigate } = useNavigation();

  function navigateToEdit() {
    if (transaction)
      navigate("TransactionsRegister", { type: "EDIT", transaction });
  }

  function requestTransactionDelete() {
    
  }

  if (!transaction) return null;

  return (
    <FloatingButtonGroup>
      <AppFloatingButton
        buttonStyle={styles.transactionsOptionButton}
        icon="create-outline"
        textStyle={styles.editTransactionButton}
        onPress={navigateToEdit}
        label="Editar transação"
      />
      <AppFloatingButton
        icon="trash-outline"
        buttonStyle={styles.transactionsOptionButton}
        onPress={requestTransactionDelete}
        textStyle={styles.deleteTransactionButton}
        label="Deletar"
      />
    </FloatingButtonGroup>
  );
}
