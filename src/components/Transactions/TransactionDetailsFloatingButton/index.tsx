import { styles } from "./styles";
import { useContext, useState } from "react";
import AppFloatingButton from "../../AppFloatingButton";
import { useNavigation } from "@react-navigation/native";
import FloatingButtonGroup from "../../FloatingButtonGroup";
import { AlertType, Transaction } from "../../../shared/interfaces";
import AppDialog from "../../AppDialog";
import AppButton from "../../AppButton";
import { TransactionsService } from "../../../services/transactions";
import { ErrorUtils } from "../../../utils/error";
import AlertContext from "../../../contexts/alert";
import { CANNOT_DELETE_TRANSACTION } from "../../../constants";

interface TransactionDetailsFloatingButtonProps {
  transaction: Transaction | null;
}

export default function TransactionDetailsFloatingButton({
  transaction,
}: TransactionDetailsFloatingButtonProps) {
  const { navigate } = useNavigation();
  const [dialogVisible, setDialogVisible] = useState(false);
  const alert = useContext(AlertContext);

  function navigateToEdit() {
    if (transaction)
      navigate("TransactionsRegister", {
        type: "EDIT",
        transaction,
      });
  }

  function dismissDialog() {
    setDialogVisible(false);
  }

  async function deleteTransaction() {
    if (!transaction) return;

    try {
      await TransactionsService.deleteById(transaction.id);
      navigate("Transactions");
    } catch (error) {
      const msg = ErrorUtils.getErrorMessage(error);

      alert.update({
        text: msg ?? CANNOT_DELETE_TRANSACTION,
        type: AlertType.ERROR,
      });
    }
  }

  function toggleTransactionDelete() {
    setDialogVisible(true);
  }

  if (!transaction) return null;

  return (
    <FloatingButtonGroup>
      <AppDialog
        visible={dialogVisible}
        onDismiss={dismissDialog}
        title="Tem certeza que deseja deletar essa movimentação?"
      >
        <AppButton
          text="Cancelar"
          style={styles.dialogButton}
          textStyle={styles.dialogButtonText}
          onPress={dismissDialog}
        />
        <AppButton
          text="Deletar transação"
          style={{ ...styles.dialogButton, ...styles.dialogConfirmDelete }}
          textStyle={{
            ...styles.dialogButtonText,
            ...styles.dialogConfirmDeleteText,
          }}
          onPress={deleteTransaction}
        />
      </AppDialog>
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
        onPress={toggleTransactionDelete}
        textStyle={styles.deleteTransactionButton}
        label="Deletar"
      />
    </FloatingButtonGroup>
  );
}
