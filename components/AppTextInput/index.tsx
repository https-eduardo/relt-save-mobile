import { useTheme } from "@react-navigation/native";
import { Text, TextInput, View } from "react-native";
import { styles } from "./styles";

interface TextInputProps {
  label: string;
  placeholder: string;
  value: string;
  block?: boolean;
}

export default function AppTextInput({
  label,
  placeholder,
  value,
  block,
}: TextInputProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.textInputContainer}>
      <Text style={{ ...styles.label, color: colors.primary }}>{label}</Text>
      <TextInput
        style={{ ...styles.textInput, color: colors.text }}
        value={value}
        placeholder={placeholder}
      ></TextInput>
    </View>
  );
}
