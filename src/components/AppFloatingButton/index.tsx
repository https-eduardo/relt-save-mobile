import { Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import Ionicon from "@expo/vector-icons/Ionicons";
import AppButton from "../AppButton";
import { styles } from "./styles";

interface AppFloatingButtonProps {
  label?: string;
  primary?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  buttonStyle?: ViewStyle;
  onPress: () => void;
  icon: keyof typeof Ionicon.glyphMap;
}

export default function AppFloatingButton(props: AppFloatingButtonProps) {
  return (
    <TouchableOpacity style={[styles.floatingButtonContainer, props.style]}>
      {props.label && (
        <Text style={[styles.floatingButtonLabel, props.textStyle]}>
          {props.label}
        </Text>
      )}
      <AppButton
        primary={props.primary}
        onPress={props.onPress}
        style={{ ...styles.floatingButton, ...props.buttonStyle }}
      >
        <Ionicon
          name={props.icon}
          style={[styles.floatingButtonIcon, props.textStyle]}
        />
      </AppButton>
    </TouchableOpacity>
  );
}
