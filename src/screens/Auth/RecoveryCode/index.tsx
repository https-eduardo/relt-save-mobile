import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
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
import AuthLayout from "../../../layouts/auth";

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
    <AuthLayout returnable>
      <AuthLayout.Content>
        <AuthLayout.Texts>
          <AuthLayout.Title>Recupere sua conta</AuthLayout.Title>
          <AuthLayout.Subtitle>
            Insira o código enviado ao seu email para conseguir alterar sua
            senha.
          </AuthLayout.Subtitle>
        </AuthLayout.Texts>
        <AuthLayout.Inputs>
          <AppTextInput
            icon="key-outline"
            label="Código de recuperação"
            placeholder="A86FD8"
            value={code}
            onChange={handleCodeChange}
            errorMessage={errors.code}
          />
        </AuthLayout.Inputs>
        <AppButton onPress={validateRecoveryCode} primary text="Avançar">
          <IoniIcon
            name="arrow-forward-outline"
            size={18}
            color={colors.textWhite}
          />
        </AppButton>
      </AuthLayout.Content>
    </AuthLayout>
  );
}
