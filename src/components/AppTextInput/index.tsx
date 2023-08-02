import { useTheme } from "@react-navigation/native";
import {
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from "react-native";
import { styles } from "./styles";
import Ionicon from "@expo/vector-icons/Ionicons";
import { useState } from "react";

// Explore if there's a better alternative to do the validation.
type InputValidatorType =
  | "email"
  | "small-text"
  | "password"
  | "text"
  | "user"
  | "price"
  | "date";

interface TextInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  icon?: keyof typeof Ionicon.glyphMap;
  validatorType?: InputValidatorType;
  onChange?: (event: NativeSyntheticEvent<TextInputChangeEventData>) => void;
}

export default function AppTextInput(props: TextInputProps) {
  const { colors } = useTheme();

  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [passwordIcon, setPasswordIcon] =
    useState<keyof typeof Ionicon.glyphMap>("eye-off-outline");

  function togglePasswordVisibility() {
    setPasswordVisible(!isPasswordVisible);
    setPasswordIcon(
      passwordIcon !== "eye-sharp" ? "eye-sharp" : "eye-off-outline"
    );
  }

  return (
    <View style={styles.textInputContainer}>
      <Text style={{ ...styles.label, color: colors.textBlack }}>
        {props.label}
      </Text>
      <View style={styles.textInputWrapper}>
        {props.icon && (
          <Ionicon name={props.icon} size={18} style={styles.decorativeIcon} />
        )}
        <TextInput
          style={{ ...styles.textInput, color: colors.text }}
          onChange={props.onChange}
          value={props.value}
          placeholder={props.placeholder}
          secureTextEntry={
            props.validatorType === "password" && !isPasswordVisible
          }
        />
        {props.validatorType === "password" && (
          <Ionicon
            name={passwordIcon}
            style={styles.passwordIcon}
            onPress={togglePasswordVisibility}
            size={18}
          />
        )}
      </View>
    </View>
  );
}
