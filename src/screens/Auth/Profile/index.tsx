import { NavigationProp, Route } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import {
  NativeSyntheticEvent,
  Text,
  TextInputChangeEventData,
  View,
} from "react-native";
import AppTextInput from "../../../components/AppTextInput";
import AppButton from "../../../components/AppButton";
import { styles } from "./styles";
import { globalStyles } from "../../../shared/styles/global";
import Avatar from "../../../components/Avatar";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../../theme";
import IoniIcon from "@expo/vector-icons/Ionicons";
import { useValidatedState } from "vuct-validator/react";
import { VALIDATION_RULES } from "../../../constants";
import { ValidationError } from "vuct-validator";
import ReturnIcon from "../../../components/ReturnIcon";
import { OAuthService } from "../../../services/oauth";

interface ProfileProps {
  route: Route<"Profile", { token: string | null }>;
  navigation: NavigationProp<ReactNavigation.RootParamList>;
}

export default function ProfileScreen({ route, navigation }: ProfileProps) {
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

  const [profileUrl, setProfileUrl] = useState("");

  const loadProfileInfo = useCallback(async () => {
    try {
      const token = route.params.token as string;
      const profile = await OAuthService.getUserInfoFromGoogle(token);
      setUsername(profile.name);
      setEmail(profile.email);
      setProfileUrl(profile.picture);
    } catch {}
  }, []);

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

  function handleProfileSave() {}

  useEffect(() => {
    loadProfileInfo();
  }, [loadProfileInfo]);

  return (
    <View style={styles.container}>
      <ReturnIcon />
      <View style={styles.content}>
        <View style={globalStyles.texts}>
          <Text style={globalStyles.title}>Seu perfil</Text>
          <Text style={globalStyles.subtitle}>
            Confirme suas informações de registro para prosseguir.
          </Text>
        </View>
        <View style={styles.avatarsContainer}>
          <Avatar url={profileUrl} size="big" />
          <Avatar url={profileUrl} size="medium" />
          <Avatar url={profileUrl} size="small" />
        </View>
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
          onChange={handleEmailChange}
          value={email}
          errorMessage={errors.email}
        />
        <AppButton primary text="Salvar" onPress={handleProfileSave} />
      </View>
    </View>
  );
}
