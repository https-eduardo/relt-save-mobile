import { useNavigation } from "@react-navigation/native";
import AppFloatingButton from "../../AppFloatingButton";
import { styles } from "./styles";
import { CardFormProps } from "../../../shared/interfaces";

export default function BankAccountDetailsFloatingButton({
  bankAccountId,
}: CardFormProps) {
  const { navigate } = useNavigation();

  function navigateToBankCardRegister() {
    navigate("BankCardRegister", { bankAccountId });
  }

  return (
    <AppFloatingButton
      primary
      icon="add-outline"
      style={styles.floatingButton}
      onPress={navigateToBankCardRegister}
    />
  );
}
