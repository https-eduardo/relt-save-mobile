import { PropsWithChildren } from "react";
import {
  TouchableOpacity,
  GestureResponderEvent,
  Text,
  ViewStyle,
} from "react-native";
import { styles } from "./styles";

interface AppButtonProps extends PropsWithChildren {
  onPress: (event: GestureResponderEvent) => void;
  text?: string;
  primary?: boolean;
  secondary?: boolean;
  block?: boolean;
  style?: ViewStyle;
}

export default function AppButton(props: AppButtonProps) {
  const propsStyles = {
    ...(props.primary && styles.primary),
    ...(props.secondary && styles.secondary),
    ...(props.block && styles.block),
  };

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.buttonContainer, propsStyles, props.style]}
    >
      {props.text && (
        <Text style={{ ...styles.buttonText, color: propsStyles.color }}>
          {props.text}
        </Text>
      )}
      {props.children}
    </TouchableOpacity>
  );
}
