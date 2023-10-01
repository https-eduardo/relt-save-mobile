import { ScrollView } from "react-native";
import ReturnIcon from "../../components/ReturnIcon";
import { styles } from "./styles";
import TransactionForm from "../../components/Transactions/TransactionForm";

export default function TransactionsRegister() {
  return (
    <ScrollView style={styles.transactionsRegisterWrapper}>
      <ReturnIcon />
      <TransactionForm />
    </ScrollView>
  );
}
