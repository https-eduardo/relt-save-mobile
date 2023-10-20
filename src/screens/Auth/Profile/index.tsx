import { useCallback, useContext, useEffect, useState } from "react";
import AppTextInput from "../../../components/AppTextInput";
import AppButton from "../../../components/AppButton";
import Avatar from "../../../components/Avatar";
import AuthLayout from "../../../layouts/auth";
import { AuthService } from "../../../services/auth";
import * as SecureStore from "expo-secure-store";
import { ACCESS_TOKEN_STORE_KEY } from "../../../constants";
import { useNavigation } from "@react-navigation/native";
import AlertContext from "../../../contexts/alert";
import { CANNOT_SAVE_PROFILE } from "../../../constants";
import { AlertType } from "../../../shared/interfaces/alert.interface";
import { ErrorUtils } from "../../../utils/error";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileSchema } from "../../../validation/schemas/auth.schema";
import { Controller, useForm } from "react-hook-form";

interface ProfileFormData {
  username: string;
}

export default function ProfileScreen() {
  const { navigate } = useNavigation();
  const alert = useContext(AlertContext);

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileSchema),
  });

  const [profileUrl, setProfileUrl] = useState("");
  const [email, setEmail] = useState("");

  const loadProfileInfo = useCallback(async () => {
    try {
      const token = await SecureStore.getItemAsync(ACCESS_TOKEN_STORE_KEY);
      if (!token) throw new Error();
      const profile = await AuthService.getProfile();

      setValue("username", profile.name);
      setEmail(profile.email);
      setProfileUrl(profile.profile_url);
    } catch {}
  }, []);

  async function handleProfileSave({ username }: ProfileFormData) {
    try {
      await AuthService.saveProfile(username);
    } catch (error) {
      const msg = ErrorUtils.getErrorMessage(error);

      alert.update({
        text: msg ?? CANNOT_SAVE_PROFILE,
        type: AlertType.ERROR,
      });
    }
    navigate("Home");
  }

  useEffect(() => {
    loadProfileInfo();
  }, [loadProfileInfo]);

  return (
    <AuthLayout returnable>
      <AuthLayout.Content>
        <AuthLayout.Texts>
          <AuthLayout.Title>Seu perfil</AuthLayout.Title>
          <AuthLayout.Subtitle>
            Confirme suas informações de registro para prosseguir.
          </AuthLayout.Subtitle>
        </AuthLayout.Texts>
        <AuthLayout.AvatarsContainer>
          <Avatar url={profileUrl} size="big" />
          <Avatar url={profileUrl} size="medium" />
          <Avatar url={profileUrl} size="small" />
        </AuthLayout.AvatarsContainer>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <AppTextInput
              label="Nome de usuário"
              placeholder="John Doe"
              value={field.value}
              onChangeText={field.onChange}
              icon="person-outline"
              errorMessage={errors.username?.message}
            />
          )}
        />
        <AppTextInput
          icon="mail-outline"
          label="Email"
          placeholder="johndoe@email.com"
          value={email}
          disabled={true}
        />
        <AppButton
          primary
          text="Salvar"
          onPress={handleSubmit(handleProfileSave)}
        />
      </AuthLayout.Content>
    </AuthLayout>
  );
}
