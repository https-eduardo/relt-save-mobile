import { Text, TouchableWithoutFeedback } from "react-native";
import IoniIcon from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";

interface DefaultHeaderProps {
  title: string;
}

export default function DefaultHeader({ title }: DefaultHeaderProps) {
  const { navigate } = useNavigation();

  function navigateToHome() {
    navigate("Home");
  }

  return (
    <SafeAreaView style={styles.header}>
      <TouchableWithoutFeedback onPress={navigateToHome}>
        <IoniIcon name="arrow-back-outline" size={24}></IoniIcon>
      </TouchableWithoutFeedback>
      <Text style={styles.h1}>{title}</Text>
    </SafeAreaView>
  );
}
