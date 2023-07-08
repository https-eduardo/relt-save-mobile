import { useTheme } from "@react-navigation/native";
import { Text, TextInput, View } from "react-native";
import { styles } from "./styles";

// Explore if there's a better alternative to do the validation.
type InputValidatorType = 'email' | 'small-text' | 'password' | 'text' | 'user' | 'price' | 'date';

interface TextInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  block?: boolean;
  validatorType?: InputValidatorType;
}

export default function AppTextInput(props: TextInputProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.textInputContainer}>
      <Text style={{ ...styles.label, color: colors.primary }}>{props.label}</Text>
      <TextInput
        style={{ ...styles.textInput, color: colors.text }}
        value={props.value}
        placeholder={props.placeholder}
      ></TextInput>
    </View>
  );
}
