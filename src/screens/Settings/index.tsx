import { Text, View } from "react-native";
import SettingsHeader from "../../components/Settings/SettingsHeader";
import { styles } from "./styles";
import AppButton from "../../components/AppButton";
import Ionicon from "@expo/vector-icons/Ionicons";
import SettingsButton from "../../components/Settings/SettingsButton";
import { AuthService } from "../../services/auth";
import * as SecureStore from "expo-secure-store";
import {
  ACCESS_TOKEN_STORE_KEY,
  REFRESH_TOKEN_STORE_KEY,
} from "../../constants";
import { useContext } from "react";
import UserContext from "../../contexts/auth";

export default function SettingsScreen() {
  const { updateUser } = useContext(UserContext);

  function changeUserData() {}
  function manageCategories() {}
  function reportProblem() {}
  function deleteUserData() {}

  async function logout() {
    try {
      await AuthService.logout();
      await Promise.all([
        SecureStore.deleteItemAsync(ACCESS_TOKEN_STORE_KEY),
        SecureStore.deleteItemAsync(REFRESH_TOKEN_STORE_KEY),
      ]);
      updateUser(null);
    } catch {}
  }

  return (
    <View style={styles.container}>
      <SettingsHeader />
      <View style={styles.settingsContainer}>
        <Text style={styles.title}>Configurações</Text>
        <View style={styles.buttonsContainer}>
          <SettingsButton
            icon="person-outline"
            onPress={changeUserData}
            text="Alterar informações do usuário"
          />
          <SettingsButton
            icon="bookmarks-outline"
            onPress={manageCategories}
            text="Gerenciar categorias de movimentações"
          />
          <SettingsButton
            icon="flag-outline"
            onPress={reportProblem}
            text="Reportar um problema"
            style={styles.reportButton}
          />
          <SettingsButton
            icon="trash-outline"
            onPress={deleteUserData}
            text="Deletar seus dados pessoais"
            style={styles.deleteButton}
          />
          <SettingsButton
            icon="log-out-outline"
            onPress={logout}
            text="Desconectar-se da conta"
            style={styles.deleteButton}
          />
        </View>
      </View>
    </View>
  );
}
