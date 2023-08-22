import { Text, View, Image, Pressable } from "react-native";
import IoniIcon from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext } from "react";
import AuthContext from "../../contexts/auth";
import * as SecureStore from "expo-secure-store";
import { styles } from "./styles";

export default function Header() {
  const { user, updateUser } = useContext(AuthContext);

  async function handleLogout() {
    await Promise.all([
      SecureStore.deleteItemAsync("refreshToken"),
      SecureStore.deleteItemAsync("accessToken"),
    ]);
    updateUser(null);
  }

  return (
    <SafeAreaView style={styles.header}>
      {/* Border radius image */}
      <View style={styles.profileImgContainer}>
        <Image source={{ uri: user.picture }} style={styles.profileImg}></Image>
      </View>
      <View style={styles.headerContent}>
        <Text style={styles.headerGreeting}>Olá, {user.given_name}</Text>
        <View style={styles.profileIcons}>
          <IoniIcon name="eye-outline" size={20}></IoniIcon>
          <IoniIcon name="notifications-outline" size={20}></IoniIcon>
          <Pressable onPress={handleLogout}>
            <IoniIcon name="settings-outline" size={20}></IoniIcon>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
