import { View } from "react-native";
import Header from "../../components/Header";
import { useNavigation } from "@react-navigation/native";

export default function TransactionsScreen() {
  const navigation = useNavigation();

  return (
    <View>
      <Header>
        <Header.Title>Suas movimentações</Header.Title>
      </Header>
    </View>
  );
}
