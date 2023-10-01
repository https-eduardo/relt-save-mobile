import { Image, Text } from "react-native";
import Logo from "../../../components/Logo";
import AppButton from "../../../components/AppButton";
import { useNavigation, useTheme } from "@react-navigation/native";
import * as AuthSession from "expo-auth-session";
import * as SecureStore from "expo-secure-store";
import IoniIcon from "@expo/vector-icons/Ionicons";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../../contexts/auth";
import { AuthService } from "../../../services/auth";
import { styles } from "./styles";
import AuthLayout from "../../../layouts/auth";
import {
  ACCESS_TOKEN_STORE_KEY,
  REFRESH_TOKEN_STORE_KEY,
} from "../../../constants/auth";
import { setDefaultBearerToken } from "../../../services";

interface OAuthResponse {
  type: string;
  params: {
    access_token: string;
    refresh_token: string;
    already_registered: boolean;
  };
  url: string;
}

export default function GoogleLoginScreen() {
  const googleIcon = require("../../../../assets/images/google-icon.png");
  const savingsImg = require("../../../../assets/images/savings-illustration.png");

  const { navigate } = useNavigation();
  const { colors } = useTheme();

  const [loading, setLoading] = useState(false);
  const { updateUser } = useContext(UserContext);

  async function handleAutomaticAuthentication() {
    const refreshToken = await SecureStore.getItemAsync(
      REFRESH_TOKEN_STORE_KEY
    );
    let accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN_STORE_KEY);
    let user = null;

    if (!refreshToken || !accessToken) {
      setLoading(false);
      return;
    }

    try {
      let profile = await AuthService.getProfile();
      user = profile;
    } catch {
      try {
        let profile = await AuthService.refreshAccessToken(refreshToken);
        await SecureStore.setItemAsync(
          ACCESS_TOKEN_STORE_KEY,
          profile.access_token
        );
      } catch {
        setLoading(false);
        return;
      }
    }

    updateUser(user);
  }

  function navigateToMailLogin() {
    navigate("MailLogin");
  }

  async function handleGoogleLogin() {
    const redirectUri = AuthSession.makeRedirectUri({
      path: "expo-auth-session",
    });
    const authUrl = `https://9cba-45-176-69-235.ngrok-free.app/auth/google?redirect_uri=${redirectUri}`;

    const { type, params } = (await AuthSession.startAsync({
      authUrl,
    })) as OAuthResponse;
    if (type !== "success") return;

    SecureStore.setItemAsync(ACCESS_TOKEN_STORE_KEY, params.access_token);
    SecureStore.setItemAsync(REFRESH_TOKEN_STORE_KEY, params.refresh_token);
    setDefaultBearerToken(params.access_token);
    if (!params.already_registered) return navigate("Profile");

    const profile = await AuthService.getProfile();
    updateUser(profile);
  }

  useEffect(() => {
    // handleAutomaticAuthentication();
  }, []);

  if (loading) return null;

  return (
    <AuthLayout>
      <AuthLayout.Content>
        <Image source={savingsImg} style={styles.savingsImg} />
        <Logo style={styles.logo} />
        <AuthLayout.Subtitle style={styles.subtitle}>
          Gerencie e controle suas despesas mensais de forma eficiente.
        </AuthLayout.Subtitle>
      </AuthLayout.Content>
      <AuthLayout.ButtonContainer style={styles.buttons}>
        <AppButton onPress={navigateToMailLogin} primary>
          <Text style={styles.emailButtonText}>Continuar</Text>
          <IoniIcon
            name="arrow-forward-outline"
            size={18}
            color={colors.white}
          />
        </AppButton>
        <AppButton onPress={handleGoogleLogin}>
          <Image source={googleIcon} style={styles.googleIcon}></Image>
          <Text style={styles.googleButtonText}>Entrar com o Google</Text>
        </AppButton>
      </AuthLayout.ButtonContainer>
    </AuthLayout>
  );
}
