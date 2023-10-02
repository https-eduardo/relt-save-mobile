import AppTextInput from "../../../components/AppTextInput";
import AppButton from "../../../components/AppButton";
import { useContext, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AuthService } from "../../../services/auth";
import { RecoverPasswordRouteProps } from "../../../../@types/navigation";
import AuthLayout from "../../../layouts/auth";
import AlertContext from "../../../contexts/alert";
import { AlertType } from "../../../shared/interfaces/alert.interface";
import { ErrorUtils } from "../../../utils/error";
import { CANNOT_RECOVER_PASSWORD } from "../../../constants/messages";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { recoverPasswordSchema } from "../../../validation/schemas/auth.schema";

interface RecoverFormData {
  password: string;
  confirmPassword: string;
}

export default function RecoverPasswordScreen() {
  const { navigate } = useNavigation();
  const alert = useContext(AlertContext);
  const route = useRoute();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(recoverPasswordSchema),
  });

  useEffect(() => {
    register("password");
    register("confirmPassword");
  }, [register]);

  async function recoverPassword({
    password,
    confirmPassword,
  }: RecoverFormData) {
    try {
      const { email, recoveryCode } = route.params as RecoverPasswordRouteProps;

      await AuthService.recoverPassword({
        email,
        recoveryCode,
        password,
        confirmPassword,
      });
      navigate("MailLogin");
    } catch (error) {
      const msg = ErrorUtils.getErrorMessage(error);

      alert.update({
        text: msg ?? CANNOT_RECOVER_PASSWORD,
        type: AlertType.ERROR,
      });
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
            onChangeText={(text) => setValue("password", text)}
            errorMessage={errors.password?.message}
          />
          <AppTextInput
            icon="lock-closed-outline"
            label="Confirme sua senha"
            placeholder="suanovasenha123"
            onChangeText={(text) => setValue("confirmPassword", text)}
            errorMessage={errors.confirmPassword?.message}
          />
        </AuthLayout.Inputs>
        <AppButton
          onPress={handleSubmit(recoverPassword)}
          primary
          text="Salvar"
        />
      </AuthLayout.Content>
    </AuthLayout>
  );
}
