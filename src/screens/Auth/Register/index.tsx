import {
  NativeSyntheticEvent,
  Text,
  TextInputChangeEventData,
} from "react-native";
import { styles } from "./styles";
import AppTextInput from "../../../components/AppTextInput";
import AppButton from "../../../components/AppButton";
import IoniIcon from "@expo/vector-icons/Ionicons";
import { COLORS } from "../../../theme";
import { useNavigation } from "@react-navigation/native";
import { useValidatedState } from "vuct-validator/react";
import { VALIDATION_RULES } from "../../../constants";
import { ValidationError } from "vuct-validator";
import { useState } from "react";
import AuthLayout from "../../../layouts/auth";

export default function RegisterScreen() {
  const navigation = useNavigation();

  const [errors, setErrors] = useState<ValidationError>({});

  function handleValidationError(error: ValidationError) {
    setErrors((prevState) => ({ ...prevState, ...error }));
  }

  const [username, setUsername] = useValidatedState(
    { name: "username", value: "" },
    VALIDATION_RULES.username,
    handleValidationError
  );

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

  const [confirmPassword, setConfirmPassword] = useValidatedState(
    { name: "confirmPassword", value: "" },
    VALIDATION_RULES.password,
    handleValidationError
  );

  function handleUsernameChange(
    ev: NativeSyntheticEvent<TextInputChangeEventData>
  ) {
    setUsername(ev.nativeEvent.text);
  }

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

  function handleConfirmPasswordChange(
    ev: NativeSyntheticEvent<TextInputChangeEventData>
  ) {
    setConfirmPassword(ev.nativeEvent.text);
  }

  async function handleRegister() {}

  function navigateToLogin() {
    navigation.navigate("MailLogin");
  }

  return (
    <AuthLayout returnable>
      <AuthLayout.Content>
        <AuthLayout.Texts>
          <AuthLayout.Title>Cadastro</AuthLayout.Title>
          <AuthLayout.Subtitle>
            Crie uma conta para acessar todos os recursos de nossa plataforma.
          </AuthLayout.Subtitle>
        </AuthLayout.Texts>
        <AuthLayout.Inputs>
          <AppTextInput
            icon="person-outline"
            label="Nome de usuário"
            placeholder="John Doe"
            value={username}
            onChange={handleUsernameChange}
            errorMessage={errors.username}
          />
          <AppTextInput
            icon="mail-outline"
            label="Email"
            placeholder="john.doe@gmail.com"
            value={email}
            onChange={handleEmailChange}
            errorMessage={errors.email}
          />
          <AppTextInput
            icon="lock-closed-outline"
            label="Senha"
            placeholder="senha123"
            password
            value={password}
            onChange={handlePasswordChange}
            errorMessage={errors.password}
          />
          <AppTextInput
            icon="lock-closed-outline"
            label="Confirme sua senha"
            placeholder="senha123"
            password
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            errorMessage={errors.confirmPassword}
          />
        </AuthLayout.Inputs>
        <AppButton onPress={handleRegister} primary text="Avançar">
          <IoniIcon name="arrow-forward" size={18} color={COLORS.textWhite} />
        </AppButton>
        <Text style={styles.login}>
          Já tem conta?{" "}
          <Text style={styles.loginLink} onPress={navigateToLogin}>
            Faça seu login aqui.
          </Text>
        </Text>
      </AuthLayout.Content>
    </AuthLayout>
  );
}
