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

interface TextInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  icon?: keyof typeof Ionicon.glyphMap;
  password?: boolean;
  onChange?: (event: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  errorMessage?: string;
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
      <Text style={{ ...styles.label, color: colors.black }}>
        {props.label}
      </Text>
      <View
        style={[
          styles.textInputWrapper,
          !!props.errorMessage ? styles.error : {},
        ]}
      >
        {props.icon && (
          <Ionicon name={props.icon} size={18} style={styles.decorativeIcon} />
        )}
        <TextInput
          style={{ ...styles.textInput, color: colors.text }}
          onChange={props.onChange}
          value={props.value}
          placeholder={props.placeholder}
          secureTextEntry={props.password && !isPasswordVisible}
        />
        {props.password && (
          <Ionicon
            name={passwordIcon}
            style={styles.passwordIcon}
            onPress={togglePasswordVisibility}
            size={18}
          />
        )}
      </View>
      <Text
        style={[styles.errorMessage, { opacity: !!props.errorMessage ? 1 : 0 }]}
      >
        {props.errorMessage}
      </Text>
    </View>
  );
}
