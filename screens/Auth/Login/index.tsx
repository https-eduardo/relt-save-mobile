import { StyleSheet, View, Image, Text } from "react-native";
import Logo from "../../../components/Logo";
import AppButton from "../../../components/AppButton";
import {
  CommonActions,
  NavigationAction,
  useNavigation,
} from "@react-navigation/native";
import * as AuthSession from "expo-auth-session";
import * as SecureStore from "expo-secure-store";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../contexts/auth";
import {
  getProfileByAccessToken,
  refreshAccessToken,
} from "../../../services/auth";
import { styles } from "./styles";

interface OAuthResponse {
  type: string;
  params: {
    access_token: string;
    refresh_token: string;
  };
  url: string;
}

export default function LoginScreen() {
  const googleIcon = require("../assets/images/google-icon.png");
  const savingsImg = require("../assets/images/savings-illustration.png");
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const { updateUser } = useContext(AuthContext);

  async function handleAutomaticAuthentication() {
    // Get stored auth tokens
    const refreshToken = await SecureStore.getItemAsync("refreshToken");
    let accessToken = await SecureStore.getItemAsync("accessToken");
    let user = null;
    // Check if refresh token exists
    if (refreshToken && accessToken) {
      // Try to fetch user profile with the stored accessToken
      try {
        let { data: profile } = await getProfileByAccessToken(accessToken);
        user = profile;
      } catch {
        // If request fails, will try to refresh the access token
        try {
          let { data: profile } = await refreshAccessToken(refreshToken);
          await SecureStore.setItemAsync("accessToken", profile.access_token);
        } catch {
          setLoading(false);
          return;
        }
      }
      // Get user info and update context state
      updateUser(user);
    } else setLoading(false);
  }

  async function handleLogin() {
    const authUrl = "https://f9f5-45-176-69-251.ngrok-free.app/auth/google";
    // Initialize OAuth 2.0 flux
    const { type, params } = (await AuthSession.startAsync({
      authUrl,
    })) as OAuthResponse;
    // If OAuth flux worked properly, store tokens and navigate to profile.
    if (type === "success") {
      await SecureStore.setItemAsync("accessToken", params.access_token);
      if (params.refresh_token !== "undefined")
        await SecureStore.setItemAsync("refreshToken", params.refresh_token);
      navigation.navigate("Profile", { token: params.access_token });
    }
  }

  useEffect(() => {
    // handleAutomaticAuthentication();
  }, []);

  if (loading) return null;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={savingsImg} style={styles.savingsImg}></Image>
        <Logo style={styles.logo}></Logo>
        <Text style={styles.subtitle}>
          Gerencie e controle seus gastos mensais de forma eficiente.
        </Text>
        <AppButton
          title="Entrar com o Google"
          onPress={handleLogin}
          containerStyle={styles.googleButtonContainer}
          textStyle={styles.googleButtonText}
        >
          <Image
            source={googleIcon}
            style={{ maxWidth: 24, maxHeight: 24 }}
          ></Image>
        </AppButton>
      </View>
    </View>
  );
}
