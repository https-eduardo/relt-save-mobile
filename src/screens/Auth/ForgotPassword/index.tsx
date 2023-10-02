import AppTextInput from "../../../components/AppTextInput";
import { useContext, useEffect } from "react";
import AppButton from "../../../components/AppButton";
import IoniIcon from "@expo/vector-icons/Ionicons";
import { useNavigation, useTheme } from "@react-navigation/native";
import { AuthService } from "../../../services/auth";
import AuthLayout from "../../../layouts/auth";
import AlertContext from "../../../contexts/alert";
import { AlertType } from "../../../shared/interfaces/alert.interface";
import { ErrorUtils } from "../../../utils/error";
import { CANNOT_SEND_RECOVERY_CODE } from "../../../constants/messages";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordSchema } from "../../../validation/schemas/auth.schema";

interface ForgotPasswordFormData {
  email: string;
}

export default function ForgotPasswordScreen() {
  const { navigate } = useNavigation();
  const { colors } = useTheme();
  const alert = useContext(AlertContext);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });

  useEffect(() => {
    register("email");
  }, [register]);

  async function sendRecoveryCode({ email }: ForgotPasswordFormData) {
    try {
      await AuthService.sendPasswordRecoveryCode(email);
      navigate("RecoveryCode", { email });
    } catch (error) {
      const msg = ErrorUtils.getErrorMessage(error);

      alert.update({
        text: msg ?? CANNOT_SEND_RECOVERY_CODE,
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
            onChangeText={(text) => setValue("email", text)}
            errorMessage={errors.email?.message}
          />
        </AuthLayout.Inputs>
        <AppButton
          onPress={handleSubmit(sendRecoveryCode)}
          primary
          text="Enviar"
        >
          <IoniIcon
            name="arrow-forward-outline"
            size={18}
            color={colors.white}
          />
        </AppButton>
      </AuthLayout.Content>
    </AuthLayout>
  );
}
