import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useTheme } from "@react-navigation/native";
import { styles } from "./styles";
import IoniIcon from "@expo/vector-icons/Ionicons";

interface ReturnIconProps {
  size?: number;
  color?: string;
}

export default function ReturnIcon({
  size = 24,
  color = "text",
}: ReturnIconProps) {
  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <SafeAreaView style={styles.returnIconContainer}>
      <IoniIcon
        name="arrow-back"
        size={size}
        color={colors[color]}
        onPress={navigation.goBack}
      />
    </SafeAreaView>
  );
}
