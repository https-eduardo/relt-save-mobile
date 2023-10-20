import AppTextInput from "../../../components/AppTextInput";
import AppButton from "../../../components/AppButton";
import IoniIcon from "@expo/vector-icons/Ionicons";
import { useTheme } from "@react-navigation/native";
import { useContext, useEffect } from "react";
import { AuthService } from "../../../services/auth";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RecoveryCodeRouteProps } from "../../../../@types/navigation";
import AuthLayout from "../../../layouts/auth";
import AlertContext from "../../../contexts/alert";
import { ErrorUtils } from "../../../utils/error";
import { AlertType } from "../../../shared/interfaces/alert.interface";
import { CANNOT_VALIDATE_RECOVERY_CODE } from "../../../constants";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { recoveryCodeSchema } from "../../../validation/schemas/auth.schema";

interface RecoveryCodeForm {
  code: string;
}

export default function RecoveryCodeScreen() {
  const { colors } = useTheme();
  const { navigate } = useNavigation();
  const route = useRoute();
  const alert = useContext(AlertContext);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(recoveryCodeSchema),
  });

  useEffect(() => {
    register("code");
  }, [register]);

  async function validateRecoveryCode({ code }: RecoveryCodeForm) {
    try {
      const { email } = route.params as RecoveryCodeRouteProps;

      await AuthService.validateRecoveryCode(email, code);
      navigate("RecoverPassword", { email, recoveryCode: code });
    } catch (error) {
      const msg = ErrorUtils.getErrorMessage(error);

      alert.update({
        text: msg ?? CANNOT_VALIDATE_RECOVERY_CODE,
        type: AlertType.ERROR,
      });
    }
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
            onChangeText={(text) => setValue("code", text)}
            errorMessage={errors.code?.message}
          />
        </AuthLayout.Inputs>
        <AppButton
          onPress={handleSubmit(validateRecoveryCode)}
          primary
          text="Avançar"
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
