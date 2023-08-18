import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import AppTextInput from "../../../components/AppTextInput";
import AppButton from "../../../components/AppButton";
import { useValidatedState } from "vuct-validator/react";
import { VALIDATION_RULES } from "../../../constants";
import { ValidationError } from "vuct-validator";
import { useState } from "react";
import { useNavigation, useRoute, useTheme } from "@react-navigation/native";
import { AuthService } from "../../../services/auth";
import { RecoverPasswordRouteProps } from "../../../../@types/navigation";
import AuthLayout from "../../../layouts/auth";

export default function RecoverPasswordScreen() {
  const [errors, setErrors] = useState<ValidationError>({});
  const { navigate } = useNavigation();
  const route = useRoute();

  const { colors } = useTheme();

  function handleValidationError(error: ValidationError) {
    setErrors((prevState) => ({ ...prevState, ...error }));
  }

  const [password, setPassword] = useValidatedState(
    { name: "password", value: "" },
    VALIDATION_RULES.password,
    handleValidationError
  );

  const [confirmPassword, setConfirmPassword] = useValidatedState(
    { name: "confirmPassword", value: "" },
    VALIDATION_RULES.password,
    handleValidationError
  );

  function handlePasswordChange(
    ev: NativeSyntheticEvent<TextInputChangeEventData>
  ) {
    setPassword(ev.nativeEvent.text);
  }

  function handleConfirmPasswordChange(
    ev: NativeSyntheticEvent<TextInputChangeEventData>
  ) {
    setConfirmPassword(ev.nativeEvent.text);
  }

  async function recoverPassword() {
    try {
      const { email, recoveryCode } = route.params as RecoverPasswordRouteProps;
      await AuthService.recoverPassword({
        email,
        recoveryCode,
        password,
        confirmPassword,
      });
      navigate("MailLogin");
    } catch {
      // Show some error
    }
  }

  return (
    <AuthLayout returnable>
      <AuthLayout.Content>
        <AuthLayout.Texts>
          <AuthLayout.Title>Recuperar senha</AuthLayout.Title>
          <AuthLayout.Subtitle>
            Escolha uma senha nova para garantir novamente o acesso a sua conta.
          </AuthLayout.Subtitle>
        </AuthLayout.Texts>
        <AuthLayout.Inputs>
          <AppTextInput
            icon="lock-closed-outline"
            label="Senha"
            placeholder="suanovasenha123"
            value={password}
            onChange={handlePasswordChange}
            errorMessage={errors.password}
          />
          <AppTextInput
            icon="lock-closed-outline"
            label="Confirme sua senha"
            placeholder="suanovasenha123"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            errorMessage={errors.confirmPassword}
          />
        </AuthLayout.Inputs>
        <AppButton onPress={recoverPassword} primary text="Salvar" />
      </AuthLayout.Content>
    </AuthLayout>
  );
}
