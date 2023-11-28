import { View } from "react-native";
import ReturnIcon from "../../../components/ReturnIcon";
import { styles } from "./styles";
import BankCardForm from "../../../components/BankAccounts/BankCardForm";
import { CardFormProps } from "../../../shared/interfaces";
import { useRoute } from "@react-navigation/native";

export default function BankCardRegister() {
  const route = useRoute();

  return (
    <View style={styles.bankAccountsRegisterWrapper}>
      <ReturnIcon />
      <BankCardForm {...(route.params as CardFormProps)} />
    </View>
  );
}
