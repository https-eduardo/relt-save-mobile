import {
  NativeSyntheticEvent,
  Text,
  TextInputChangeEventData,
} from "react-native";
import { styles } from "./styles";
import AppTextInput from "../../../components/AppTextInput";
import AppButton from "../../../components/AppButton";
import { useNavigation } from "@react-navigation/native";
import { ValidationError } from "vuct-validator";
import { useValidatedState } from "vuct-validator/react";
import { useContext, useState } from "react";
import { VALIDATION_RULES } from "../../../constants/validation";
import AuthLayout from "../../../layouts/auth";
import { AuthService } from "../../../services/auth";
import { ErrorUtils } from "../../../utils/error";
import { EmptyFieldError } from "../../../shared/errors/empty-field.error";
import { InvalidValueError } from "../../../shared/errors/invalid-value.error";
import AlertContext from "../../../contexts/alert";
import { CANNOT_LOGIN } from "../../../constants/messages";
import { AlertType } from "../../../shared/interfaces/alert.interface";
import AuthContext from "../../../contexts/auth";
import {
  ACCESS_TOKEN_STORE_KEY,
  REFRESH_TOKEN_STORE_KEY,
} from "../../../constants/auth";
import { setDefaultBearerToken } from "../../../services";
import * as SecureStore from "expo-secure-store";

export default function MailLoginScreen() {
  const { navigate } = useNavigation();
  const [errors, setErrors] = useState<ValidationError>({});
  const alert = useContext(AlertContext);
  const { updateUser } = useContext(AuthContext);

  function handleValidationError(error: ValidationError) {
    setErrors((prevState) => ({ ...prevState, ...error }));
  }

  const [email, setEmail] = useValidatedState(
    { name: "email", value: "" },
    VALIDATION_RULES.email,
    handleValidationError
  );

  const [password, setPassword] = useValidatedState(
    { name: "password", value: "" },
    VALIDATION_RULES.password,
    handleValidationError
  );

  function handleEmailChange(
    ev: NativeSyntheticEvent<TextInputChangeEventData>
  ) {
    setEmail(ev.nativeEvent.text);
  }

  function handlePasswordChange(
    ev: NativeSyntheticEvent<TextInputChangeEventData>
  ) {
    setPassword(ev.nativeEvent.text);
  }

  async function handleLogin() {
    try {
      if (ErrorUtils.hasAnyEmptyField(email, password))
        throw new EmptyFieldError();
      if (ErrorUtils.hasAnyError(errors)) throw new InvalidValueError();

      const { accessToken, refreshToken } = await AuthService.login({
        email,
        password,
      });
      SecureStore.setItemAsync(ACCESS_TOKEN_STORE_KEY, accessToken);
      SecureStore.setItemAsync(REFRESH_TOKEN_STORE_KEY, refreshToken);
      setDefaultBearerToken(accessToken);
      const profile = await AuthService.getProfile();
      updateUser(profile);
    } catch (error) {
      const msg = ErrorUtils.getErrorMessage(error);

      alert.update({
        text: msg ?? CANNOT_LOGIN,
        type: AlertType.ERROR,
      });
    }
  }
  function navigateToForgotPassword() {
    navigate("ForgotPassword");
  }

  function navigateToRegister() {
    navigate("Register");
  }

  return (
    <AuthLayout>
      <AuthLayout.Content>
        <AuthLayout.Texts>
          <AuthLayout.Title>Login</AuthLayout.Title>
          <AuthLayout.Subtitle>
            Entre em sua conta para acessar os recursos da nossa plataforma.
          </AuthLayout.Subtitle>
        </AuthLayout.Texts>
        <AuthLayout.Inputs>
          <AppTextInput
            icon="person-outline"
            label="Email"
            placeholder="john.doe@gmail.com"
            value={email}
            onChange={handleEmailChange}
            errorMessage={errors.email}
          />
          <AppTextInput
            label="Senha"
            icon="lock-closed-outline"
            placeholder="senha123"
            password
            value={password}
            onChange={handlePasswordChange}
            errorMessage={errors.password}
          />
        </AuthLayout.Inputs>
        <AuthLayout.ForgotPasswordContainer>
          <Text
            style={styles.forgotPassword}
            onPress={navigateToForgotPassword}
          >
            Esqueceu sua senha?
          </Text>
        </AuthLayout.ForgotPasswordContainer>
        <AuthLayout.ButtonContainer>
          <AppButton onPress={handleLogin} primary text="Entrar" />
          <Text style={styles.register}>
            Ainda não tem conta?
            <Text style={styles.registerLink} onPress={navigateToRegister}>
              {" "}
              Se registre aqui
            </Text>
          </Text>
        </AuthLayout.ButtonContainer>
      </AuthLayout.Content>
    </AuthLayout>
  );
}
