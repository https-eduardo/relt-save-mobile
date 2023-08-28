import { StyleSheet, Text, View } from "react-native";
import AppButton from "../../components/AppButton";
import IoniIcon from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect } from "react";
import AuthContext from "../../contexts/auth";
import { AuthService } from "../../services/auth";
import * as SecureStore from "expo-secure-store";
import { styles } from "./styles";
import Header from "../../components/Header";
import Avatar from "../../components/Avatar";

export default function HomeScreen() {
  const { navigate } = useNavigation();
  const { updateUser, user } = useContext(AuthContext);

  function navigateToTransactions() {
    navigate("Transactions");
  }

  async function getProfileInfo() {
    const accessToken = await SecureStore.getItemAsync("accessToken");
    if (!accessToken) return;

    try {
      const profile = await AuthService.getProfile(accessToken);
      updateUser(profile);
    } catch { }
  }

  useEffect(() => {
    getProfileInfo();
  }, []);

  return (
    <View style={styles.container}>
      <Header monthSelector>
        <View style={styles.profileContainer}>
          <Header.Title>Olá, {user?.name.split(" ")[0]}</Header.Title>
          <Avatar url={user?.profileUrl} style={styles.profile} />
        </View>
      </Header>
    </View>
  );
}
