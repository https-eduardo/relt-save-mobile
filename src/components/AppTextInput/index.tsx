import { useTheme } from "@react-navigation/native";
import { Text, TextInput, TextInputProps, View } from "react-native";
import { styles } from "./styles";
import Ionicon from "@expo/vector-icons/Ionicons";
import { useState } from "react";

interface AppTextInputProps extends TextInputProps {
  label?: string;
  icon?: keyof typeof Ionicon.glyphMap;
  block?: boolean;
  password?: boolean;
  errorMessage?: string;
  disabled?: boolean;
}

export default function AppTextInput(props: AppTextInputProps) {
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
    <View style={[styles.textInputContainer, { flex: props.block ? 1 : 0 }]}>
      <Text style={[styles.label, { color: colors.black }]}>{props.label}</Text>
      <View
        style={[
          styles.textInputWrapper,
          props.errorMessage ? styles.error : {},
        ]}
      >
        {props.icon && (
          <Ionicon name={props.icon} size={18} style={styles.decorativeIcon} />
        )}
        <TextInput
          {...props}
          style={[styles.textInput, { color: colors.text }, props.style]}
          secureTextEntry={props.password && !isPasswordVisible}
          editable={!props.disabled}
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
        style={[
          styles.errorMessage,
          { display: props.errorMessage ? "flex" : "none" },
        ]}
      >
        {props.errorMessage}
      </Text>
    </View>
  );
}
