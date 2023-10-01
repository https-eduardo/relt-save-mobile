import { useCallback, useContext, useEffect, useState } from "react";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import AppTextInput from "../../../components/AppTextInput";
import AppButton from "../../../components/AppButton";
import Avatar from "../../../components/Avatar";
import { useValidatedState } from "vuct-validator/react";
import { VALIDATION_RULES } from "../../../constants";
import { ValidationError } from "vuct-validator";
import AuthLayout from "../../../layouts/auth";
import { AuthService } from "../../../services/auth";
import * as SecureStore from "expo-secure-store";
import { ACCESS_TOKEN_STORE_KEY } from "../../../constants/auth";
import { useNavigation } from "@react-navigation/native";
import AlertContext from "../../../contexts/alert";
import { CANNOT_SAVE_PROFILE } from "../../../constants/messages";
import { AlertType } from "../../../shared/interfaces/alert.interface";
import { EmptyFieldError } from "../../../shared/errors/empty-field.error";
import { ErrorUtils } from "../../../utils/error";
import { InvalidValueError } from "../../../shared/errors/invalid-value.error";

export default function ProfileScreen() {
  const [errors, setErrors] = useState<ValidationError>({});
  const { navigate } = useNavigation();
  const alert = useContext(AlertContext);

  function handleValidationError(error: ValidationError) {
    setErrors((prevState) => ({ ...prevState, ...error }));
  }

  const [username, setUsername] = useValidatedState(
    { name: "username", value: "" },
    VALIDATION_RULES.username,
    handleValidationError
  );

  const [profileUrl, setProfileUrl] = useState("");
  const [email, setEmail] = useState("");

  const loadProfileInfo = useCallback(async () => {
    try {
      const token = await SecureStore.getItemAsync(ACCESS_TOKEN_STORE_KEY);
      if (!token) throw new Error();
      const profile = await AuthService.getProfile();

      setUsername(profile.name);
      setEmail(profile.email);
      setProfileUrl(profile.profile_url);
    } catch {}
  }, []);

  function handleUsernameChange(
    ev: NativeSyntheticEvent<TextInputChangeEventData>
  ) {
    setUsername(ev.nativeEvent.text);
  }

  async function handleProfileSave() {
    try {
      if (ErrorUtils.hasAnyEmptyField(username, email))
        throw new EmptyFieldError();
      if (ErrorUtils.hasAnyError(errors)) throw new InvalidValueError();

      await AuthService.saveProfile(username);
    } catch (error) {
      const msg = ErrorUtils.getErrorMessage(error);

      alert.update({
        text: msg ?? CANNOT_SAVE_PROFILE,
        type: AlertType.ERROR,
      });
    }
    navigate("Profile");
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
        <AppTextInput
          label="Nome de usuário"
          value={username}
          placeholder="John Doe"
          onChange={handleUsernameChange}
          icon="person-outline"
          errorMessage={errors.username}
        />
        <AppTextInput
          icon="mail-outline"
          label="Email"
          placeholder="johndoe@email.com"
          value={email}
          disabled={true}
        />
        <AppButton primary text="Salvar" onPress={handleProfileSave} />
      </AuthLayout.Content>
    </AuthLayout>
  );
}
