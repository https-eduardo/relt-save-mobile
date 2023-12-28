import { View, Text } from "react-native";
import { useEffect } from "react";
import { styles } from "./styles";
import { COLORS } from "../../theme";

interface AppColorPickerProps {
  onChange?: (value: string) => void;
  value?: string;
}
// Just a mockup of it, for now
export function AppColorPicker({ onChange, value }: AppColorPickerProps) {
  return (
    <View style={styles.colorPickerContainer}>
      <Text style={styles.label}>Cor</Text>
      <View style={styles.color} />
    </View>
  );
}
