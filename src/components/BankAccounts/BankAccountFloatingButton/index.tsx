import { useNavigation } from "@react-navigation/native";
import AppFloatingButton from "../../AppFloatingButton";
import { styles } from "./styles";

export default function BankAccountFloatingButton() {
  const { navigate } = useNavigation();

  function navigateToBankAccountRegister() {
    navigate("BankAccountsRegister", { type: "NEW" });
  }

  return (
    <AppFloatingButton
      primary
      icon="add-outline"
      style={styles.floatingButton}
      onPress={navigateToBankAccountRegister}
    />
  );
}
