import { ScrollView } from "react-native";
import ReturnIcon from "../../../components/ReturnIcon";
import { useRoute } from "@react-navigation/native";
import BankAccountForm from "../../../components/BankAccounts/BankAccountForm";
import { BankAccountFormProps } from "../../../shared/interfaces";
import { styles } from "./styles";

export default function BankAccountsRegisterScreen() {
  const route = useRoute();

  return (
    <ScrollView style={styles.bankAccountsRegisterWrapper}>
      <ReturnIcon />
      <BankAccountForm {...(route.params as BankAccountFormProps)} />
    </ScrollView>
  );
}
