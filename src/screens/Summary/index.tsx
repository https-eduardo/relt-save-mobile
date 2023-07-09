import { StyleSheet, Text, View } from "react-native";
import HomeHeader from "../../components/HomeHeader";
import AppButton from "../../components/AppButton";
import IoniIcon from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect } from "react";
import AuthContext from "../../contexts/auth";
import { AuthService } from "../../services/auth";
import * as SecureStore from "expo-secure-store";
import { styles } from "./styles";

export default function HomeScreen() {
  const navigation = useNavigation();
  const { updateUser } = useContext(AuthContext);

  async function getProfileInfo() {
    const accessToken = await SecureStore.getItemAsync("accessToken");
    if (!accessToken) return;

    try {
      let { data: profile } = await AuthService.getProfileByAccessToken(accessToken);
      updateUser(profile);
    } catch {}
  }

  useEffect(() => {
    getProfileInfo();
  }, []);

  return (
    <View style={styles.container}>
      <HomeHeader></HomeHeader>
      <View>
        <Text style={styles.h1}>Gastos</Text>
        <View style={styles.spendingContainer}>
          <Text style={styles.spendingValueText}>R$ 2360,00</Text>
          <View style={styles.actions}>
            <View style={styles.iconButtons}>
              <AppButton onPress={() => {}} text="Extrato">
                <IoniIcon name="reader-outline" size={20} />
              </AppButton>
              <AppButton onPress={() => {}} text="Desempenho">
                <IoniIcon name="stats-chart-outline" regular size={20} />
              </AppButton>
            </View>
            <AppButton
              onPress={() => {
                navigation.navigate("Spendings");
              }}
              text="Gerenciar seus gastos"
            >
              <IoniIcon name="wallet-outline" regular size={24} />
            </AppButton>
          </View>
        </View>
        <Text style={styles.h1}>Últimos 7 dias</Text>
      </View>
    </View>
  );
}
