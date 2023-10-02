import { Text } from "react-native";
import { styles } from "./styles";
import AppTextInput from "../../../components/AppTextInput";
import AppButton from "../../../components/AppButton";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect } from "react";
import AuthLayout from "../../../layouts/auth";
import { AuthService } from "../../../services/auth";
import { ErrorUtils } from "../../../utils/error";
import AlertContext from "../../../contexts/alert";
import { CANNOT_LOGIN } from "../../../constants/messages";
import { AlertType } from "../../../shared/interfaces/alert.interface";
import UserContext from "../../../contexts/auth";
import {
  ACCESS_TOKEN_STORE_KEY,
  REFRESH_TOKEN_STORE_KEY,
} from "../../../constants/auth";
import { setDefaultBearerToken } from "../../../services";
import * as SecureStore from "expo-secure-store";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { mailLoginSchema } from "../../../validation/schemas/auth.schema";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function MailLoginScreen() {
  const { navigate } = useNavigation();
  const alert = useContext(AlertContext);
  const { updateUser } = useContext(UserContext);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(mailLoginSchema),
  });

  useEffect(() => {
    register("email");
    register("password");
  }, [register]);

  async function handleLogin({ email, password }: LoginFormValues) {
    try {
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
            onChangeText={(text) => setValue("email", text)}
            errorMessage={errors.email?.message}
          />
          <AppTextInput
            label="Senha"
            icon="lock-closed-outline"
            placeholder="senha123"
            password
            onChangeText={(text) => setValue("password", text)}
            errorMessage={errors.password?.message}
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
          <AppButton
            onPress={handleSubmit(handleLogin)}
            primary
            text="Entrar"
          />
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
