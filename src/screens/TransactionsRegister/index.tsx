import { ScrollView } from "react-native";
import ReturnIcon from "../../components/ReturnIcon";
import { styles } from "./styles";
import TransactionForm from "../../components/Transactions/TransactionForm";
import { TransactionFormProps } from "../../shared/interfaces";
import { useRoute } from "@react-navigation/native";

export default function TransactionsRegister() {
  const route = useRoute();

  return (
    <ScrollView style={styles.transactionsRegisterWrapper}>
      <ReturnIcon />
      <TransactionForm {...(route.params as TransactionFormProps)} />
    </ScrollView>
  );
}
