import { View } from "react-native";
import AppButton from "../../components/AppButton";
import IoniIcon from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import UserContext from "../../contexts/auth";
import { styles } from "./styles";
import Header from "../../components/Header";
import Avatar from "../../components/Avatar";
import SummaryHeader from "../../components/Summary/SummaryHeader";
import CategoryChardCard from "../../components/Summary/CategoryChartCard";
import SummaryAlertsCard from "../../components/Summary/SummaryAlertsCard";

export default function HomeScreen() {
  const { navigate } = useNavigation();
  const { user } = useContext(UserContext);

  function navigateToTransactions() {
    navigate("Transactions");
  }

  return (
    <View style={styles.container}>
      <SummaryHeader />
      <CategoryChardCard />
      <SummaryAlertsCard />
    </View>
  );
}
