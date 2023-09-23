import { Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import { styles } from "./styles";
import { COLORS } from "../../theme";

interface AppBadgeProps {
  color?: string;
  style?: TextStyle;
  size?: number;
  text: string;
  onPress?: () => void;
}

export default function AppBadge(props: AppBadgeProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: props.color ?? COLORS.bgInput },
      ]}
      onPress={props.onPress}
    >
      <Text style={[styles.badgeText, props.style]}>{props.text}</Text>
    </TouchableOpacity>
  );
}
