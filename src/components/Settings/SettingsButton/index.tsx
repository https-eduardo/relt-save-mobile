import { Text, TextStyle } from "react-native";
import AppButton from "../../AppButton";
import { styles } from "./styles";
import Ionicon from "@expo/vector-icons/Ionicons";

interface SettingsButtonProps {
  icon: keyof typeof Ionicon.glyphMap;
  text: string;
  onPress: () => void;
  style?: TextStyle;
}

export default function SettingsButton(props: SettingsButtonProps) {
  return (
    <AppButton onPress={props.onPress} style={styles.button}>
      <Ionicon name={props.icon} style={[styles.buttonIcon, props.style]} />
      <Text style={[styles.buttonText, props.style]}>{props.text}</Text>
    </AppButton>
  );
}
