import {
  NativeSyntheticEvent,
  Text,
  TextInputChangeEventData,
  View,
} from "react-native";
import ReturnIcon from "../../../components/ReturnIcon";
import { styles } from "./styles";
import { globalStyles } from "../../../shared/styles/global";
import AppTextInput from "../../../components/AppTextInput";
import AppButton from "../../../components/AppButton";
import IoniIcon from "@expo/vector-icons/Ionicons";
import { useTheme } from "@react-navigation/native";
import { useValidatedState } from "vuct-validator/react";
import { useState } from "react";
import { ValidationError } from "vuct-validator";
import { VALIDATION_RULES } from "../../../constants";
import { AuthService } from "../../../services/auth";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RecoveryCodeRouteProps } from "../../../../@types/navigation";

export default function RecoveryCodeScreen() {
  const { colors } = useTheme();
  const { navigate } = useNavigation();
  const route = useRoute();
  const [errors, setErrors] = useState<ValidationError>({});

  function handleValidationError(error: ValidationError) {
    setErrors((prevState) => ({ ...prevState, ...error }));
  }
  const [code, setCode] = useValidatedState(
    { name: "code", value: "" },
    VALIDATION_RULES.recoveryCode,
    handleValidationError
  );

  async function validateRecoveryCode() {
    try {
      const { email } = route.params as RecoveryCodeRouteProps;
      // await AuthService.validateRecoveryCode(email, code);
      navigate("RecoverPassword", { email, recoveryCode: code });
    } catch {
      // Show some error
    }
  }

  function handleCodeChange(
    ev: NativeSyntheticEvent<TextInputChangeEventData>
  ) {
    setCode(ev.nativeEvent.text.toUpperCase());
  }

  return (
    <View style={styles.container}>
      <ReturnIcon />
      <View style={styles.content}>
        <View style={globalStyles.texts}>
          <Text style={globalStyles.title}>Recupere sua conta</Text>
          <Text style={globalStyles.subtitle}>
            Insira o código enviado ao seu email para conseguir alterar sua
            senha.
          </Text>
        </View>
        <View style={styles.inputs}>
          <AppTextInput
            icon="key-outline"
            label="Código de recuperação"
            placeholder="A86FD8"
            value={code}
            onChange={handleCodeChange}
            errorMessage={errors.code}
          />
        </View>
        <AppButton onPress={validateRecoveryCode} primary text="Avançar">
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
