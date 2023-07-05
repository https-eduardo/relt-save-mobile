import { PropsWithChildren } from "react";
import {
  TouchableOpacity,
  GestureResponderEvent,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";
import { styles } from "./styles";

interface AppButtonProps extends PropsWithChildren {
  onPress: (event: GestureResponderEvent) => void;
  title: string;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

export default function AppButton({
  onPress,
  title,
  containerStyle,
  textStyle,
  children,
}: AppButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...styles.buttonContainer, ...containerStyle }}
    >
      {children}
      <Text style={{ ...styles.buttonText, ...textStyle }}>{title}</Text>
    </TouchableOpacity>
  );
}
