import { View, Image, Text } from "react-native";
import Logo from "../../../components/Logo";
import AppButton from "../../../components/AppButton";
import { useNavigation, useTheme } from "@react-navigation/native";
import * as AuthSession from "expo-auth-session";
import * as SecureStore from "expo-secure-store";
import IoniIcon from "@expo/vector-icons/Ionicons";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../contexts/auth";
import { AuthService } from "../../../services/auth";
import { styles } from "./styles";

interface OAuthResponse {
  type: string;
  params: {
    access_token: string;
    refresh_token: string;
  };
  url: string;
}

export default function GoogleLoginScreen() {
  const googleIcon = require("../../../../assets/images/google-icon.png");
  const savingsImg = require("../../../../assets/images/savings-illustration.png");

  const { navigate } = useNavigation();
  const { colors } = useTheme();

  const [loading, setLoading] = useState(false);
  const { updateUser } = useContext(AuthContext);

  async function handleAutomaticAuthentication() {
    const refreshToken = await SecureStore.getItemAsync("refreshToken");
    let accessToken = await SecureStore.getItemAsync("accessToken");
    let user = null;

    if (!refreshToken || !accessToken) {
      setLoading(false);
      return;
    }

    try {
      let profile = await AuthService.getProfile(accessToken);
      user = profile;
    } catch {
      try {
        let profile = await AuthService.refreshAccessToken(refreshToken);
        await SecureStore.setItemAsync("accessToken", profile.access_token);
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
    const authUrl = "https://f9f5-45-176-69-251.ngrok-free.app/auth/google";
    // Initialize OAuth 2.0 flux
    const { type, params } = (await AuthSession.startAsync({
      authUrl,
    })) as OAuthResponse;
    // If OAuth flux worked properly, store tokens and navigate to profile.
    if (type !== "success") return;

    await SecureStore.setItemAsync("accessToken", params.access_token);
    if (params.refresh_token !== "undefined")
      await SecureStore.setItemAsync("refreshToken", params.refresh_token);
    navigate("Profile", { token: params.access_token });
  }

  useEffect(() => {
    // handleAutomaticAuthentication();
  }, []);

  if (loading) return null;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={savingsImg} />
        <Logo style={styles.logo} />
        <Text style={styles.subtitle}>
          Gerencie e controle suas despesas mensais de forma eficiente.
        </Text>
        <View style={styles.buttons}>
          <AppButton onPress={navigateToMailLogin}>
            <IoniIcon name="mail-outline" size={18} color={colors.textBlack} />
            <Text style={styles.emailButtonText}>Entrar com email</Text>
          </AppButton>
          <AppButton secondary onPress={handleGoogleLogin}>
            <Image source={googleIcon} style={styles.googleIcon}></Image>
            <Text style={styles.googleButtonText}>Entrar com o Google</Text>
          </AppButton>
        </View>
      </View>
    </View>
  );
}
