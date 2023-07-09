import { View } from "react-native";
import DefaultHeader from "../../components/DefaultHeader";
import { useNavigation } from "@react-navigation/native";

export default function SpendingsScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <DefaultHeader title="Suas movimentações"></DefaultHeader>
      <View></View>
    </View>
  );
}
