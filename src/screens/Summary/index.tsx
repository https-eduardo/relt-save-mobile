import { View } from "react-native";
import AppButton from "../../components/AppButton";
import IoniIcon from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import UserContext from "../../contexts/auth";
import { styles } from "./styles";
import Header from "../../components/Header";
import Avatar from "../../components/Avatar";

export default function HomeScreen() {
  const { navigate } = useNavigation();
  const { user } = useContext(UserContext);

  function navigateToTransactions() {
    navigate("Transactions");
  }

  return (
    <View style={styles.container}>
      <Header periodSelector>
        <View style={styles.profileContainer}>
          <Header.Title>Olá, {user?.name.split(" ")[0]}</Header.Title>
          <Avatar url={user?.profile_url} style={styles.profile} />
        </View>
      </Header>
    </View>
  );
}
