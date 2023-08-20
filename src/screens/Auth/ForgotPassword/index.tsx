import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import AppTextInput from "../../../components/AppTextInput";
import { useValidatedState } from "vuct-validator/react";
import { VALIDATION_RULES } from "../../../constants";
import { ValidationError } from "vuct-validator";
import { useContext, useState } from "react";
import AppButton from "../../../components/AppButton";
import IoniIcon from "@expo/vector-icons/Ionicons";
import { useNavigation, useTheme } from "@react-navigation/native";
import { AuthService } from "../../../services/auth";
import AuthLayout from "../../../layouts/auth";
import AlertContext from "../../../contexts/alert";
import { AlertType } from "../../../shared/interfaces/alert.interface";
import { EmptyFieldError } from "../../../shared/errors/empty-field.error";
import { InvalidValueError } from "../../../shared/errors/invalid-value.error";
import { ErrorUtils } from "../../../utils/error";
import { EMAIL_NOT_FOUND } from "../../../constants/messages";

export default function ForgotPasswordScreen() {
  const [errors, setErrors] = useState<ValidationError>({});
  const { navigate } = useNavigation();
  const { colors } = useTheme();
  const alert = useContext(AlertContext);

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
      const f = ErrorUtils.hasAnyEmptyField(email);
      if (f) throw new EmptyFieldError();
      if (ErrorUtils.hasAnyError(errors)) throw new InvalidValueError();

      await AuthService.sendPasswordRecoveryCode(email);
      navigate("RecoveryCode", { email });
    } catch (error) {
      const msg = ErrorUtils.getErrorMessage(error);

      alert.update({
        text: msg ?? EMAIL_NOT_FOUND,
        type: AlertType.ERROR,
      });
    }
  }

  return (
    <AuthLayout returnable>
      <AuthLayout.Content>
        <AuthLayout.Texts>
          <AuthLayout.Title>Esqueceu sua senha?</AuthLayout.Title>
          <AuthLayout.Subtitle>
            Enviaremos um código de recuperação para o seu email.
          </AuthLayout.Subtitle>
        </AuthLayout.Texts>
        <AuthLayout.Inputs>
          <AppTextInput
            icon="mail-outline"
            label="Email"
            placeholder="john.doe@gmail.com"
            value={email}
            onChange={handleEmailChange}
            errorMessage={errors.email}
          />
        </AuthLayout.Inputs>
        <AppButton onPress={sendRecoveryCode} primary text="Enviar">
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
