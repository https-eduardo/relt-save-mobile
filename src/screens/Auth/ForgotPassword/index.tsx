import {
  NativeSyntheticEvent,
  Text,
  TextInputChangeEventData,
  View,
} from "react-native";
import ReturnIcon from "../../../components/ReturnIcon";
import { globalStyles } from "../../../shared/styles/global";
import { styles } from "./styles";
import AppTextInput from "../../../components/AppTextInput";
import { useValidatedState } from "vuct-validator/react";
import { VALIDATION_RULES } from "../../../constants";
import { ValidationError } from "vuct-validator";
import { useState } from "react";
import AppButton from "../../../components/AppButton";
import IoniIcon from "@expo/vector-icons/Ionicons";
import { useNavigation, useTheme } from "@react-navigation/native";
import { AuthService } from "../../../services/auth";

export default function ForgotPasswordScreen() {
  const [errors, setErrors] = useState<ValidationError>({});
  const { navigate } = useNavigation();
  const { colors } = useTheme();

  function handleValidationError(error: ValidationError) {
    setErrors((prevState) => ({ ...prevState, ...error }));
  }

  const [email, setEmail] = useValidatedState(
    {
      name: "email",
      value: "",
    },
    VALIDATION_RULES.email,
    handleValidationError
  );

  function handleEmailChange(
    ev: NativeSyntheticEvent<TextInputChangeEventData>
  ) {
    setEmail(ev.nativeEvent.text);
  }

  async function sendRecoveryCode() {
    try {
      // await AuthService.sendPasswordRecoveryCode(email);
      navigate("RecoveryCode", { email });
    } catch {
      // Show some error message
    }
  }

  return (
    <View style={styles.container}>
      <ReturnIcon />
      <View style={styles.content}>
        <View style={globalStyles.texts}>
          <Text style={globalStyles.title}>Esqueceu sua senha?</Text>
          <Text style={globalStyles.subtitle}>
            Enviaremos um código de recuperação para o seu email.
          </Text>
        </View>
        <View style={styles.inputs}>
          <AppTextInput
            icon="mail-outline"
            label="Email"
            placeholder="john.doe@gmail.com"
            validatorType="email"
            value={email}
            onChange={handleEmailChange}
            errorMessage={errors.email}
          />
        </View>
        <AppButton onPress={sendRecoveryCode} primary text="Enviar">
          <IoniIcon
            name="arrow-forward-outline"
            size={18}
            color={colors.textWhite}
          />
        </AppButton>
      </View>
    </View>
  );
}
