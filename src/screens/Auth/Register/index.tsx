import { Text } from "react-native";
import { styles } from "./styles";
import AppTextInput from "../../../components/AppTextInput";
import AppButton from "../../../components/AppButton";
import IoniIcon from "@expo/vector-icons/Ionicons";
import { COLORS } from "../../../theme";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect } from "react";
import AuthLayout from "../../../layouts/auth";
import { AuthService } from "../../../services/auth";
import { ErrorUtils } from "../../../utils/error";
import AlertContext from "../../../contexts/alert";
import { CANNOT_REGISTER } from "../../../constants/messages";
import { AlertType } from "../../../shared/interfaces/alert.interface";
import { useForm } from "react-hook-form";
import { registerSchema } from "../../../validation/schemas/auth.schema";
import { yupResolver } from "@hookform/resolvers/yup";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterScreen() {
  const { navigate } = useNavigation();
  const alert = useContext(AlertContext);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  useEffect(() => {
    register("name");
    register("email");
    register("password");
    register("confirmPassword");
  }, [register]);

  async function handleRegister(formData: RegisterFormData) {
    try {
      await AuthService.register(formData);
      navigateToLogin();
    } catch (error) {
      const msg = ErrorUtils.getErrorMessage(error);

      alert.update({
        text: msg ?? CANNOT_REGISTER,
        type: AlertType.ERROR,
      });
    }
  }

  function navigateToLogin() {
    navigate("MailLogin");
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
            onChangeText={(text) => setValue("name", text)}
            errorMessage={errors.name?.message}
          />
          <AppTextInput
            icon="mail-outline"
            label="Email"
            placeholder="john.doe@gmail.com"
            onChangeText={(text) => setValue("email", text)}
            errorMessage={errors.email?.message}
          />
          <AppTextInput
            icon="lock-closed-outline"
            label="Senha"
            placeholder="senha123"
            password
            onChangeText={(text) => setValue("password", text)}
            errorMessage={errors.password?.message}
          />
          <AppTextInput
            icon="lock-closed-outline"
            label="Confirme sua senha"
            placeholder="senha123"
            password
            onChangeText={(text) => setValue("confirmPassword", text)}
            errorMessage={errors.confirmPassword?.message}
          />
        </AuthLayout.Inputs>
        <AppButton
          onPress={handleSubmit(handleRegister)}
          primary
          text="Avançar"
        >
          <IoniIcon name="arrow-forward" size={18} color={COLORS.white} />
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
