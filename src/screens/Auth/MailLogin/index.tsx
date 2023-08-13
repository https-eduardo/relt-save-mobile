import {
  NativeSyntheticEvent,
  Text,
  TextInputChangeEventData,
  View,
} from "react-native";
import { styles } from "./styles";
import AppTextInput from "../../../components/AppTextInput";
import AppButton from "../../../components/AppButton";
import { useNavigation } from "@react-navigation/native";
import { ValidationError } from "vuct-validator";
import { useValidatedState } from "vuct-validator/react";
import { useState } from "react";
import { VALIDATION_RULES } from "../../../constants/validation";
import { globalStyles } from "../../../shared/styles/global";

export default function MailLoginScreen() {
  const { navigate } = useNavigation();
  const [errors, setErrors] = useState<ValidationError>({});

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

  async function handleLogin() {}
  function navigateToForgotPassword() {
    navigate("ForgotPassword");
  }

  function navigateToRegister() {
    navigate("Register");
  }

  return (
    <View style={styles.container}>
      <View style={globalStyles.texts}>
        <Text style={globalStyles.title}>Login</Text>
        <Text style={globalStyles.subtitle}>
          Entre em sua conta para acessar os recursos da nossa plataforma.
        </Text>
      </View>
      <View style={styles.inputs}>
        <AppTextInput
          icon="person-outline"
          label="Email"
          placeholder="john.doe@gmail.com"
          validatorType="email"
          value={email}
          onChange={handleEmailChange}
          errorMessage={errors.email}
        />
        <AppTextInput
          label="Senha"
          icon="lock-closed-outline"
          placeholder="senha123"
          validatorType="password"
          value={password}
          onChange={handlePasswordChange}
          errorMessage={errors.password}
        />
      </View>
      <View style={styles.forgotPasswordContainer}>
        <Text style={styles.forgotPassword} onPress={navigateToForgotPassword}>
          Esqueceu sua senha?
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <AppButton onPress={handleLogin} primary text="Entrar" />
        <Text style={styles.register}>
          Ainda não tem conta?
          <Text style={styles.registerLink} onPress={navigateToRegister}>
            {" "}
            Se registre aqui
          </Text>
        </Text>
      </View>
    </View>
  );
}
