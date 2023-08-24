import { Image, Text, View } from "react-native";
import IoniIcon from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { PropsWithChildren } from "react";
import AppSelect from "../AppSelect";
import { COLORS } from "../../theme";

interface HeaderProps extends PropsWithChildren {
  monthSelector?: boolean;
}

interface HeaderProfileProps {
  uri?: string;
}

export default function Header(props: HeaderProps) {
  // Gonna be dynamic in the future
  const data = [
    { label: "Janeiro, 2023", value: "1" },
    { label: "Fevereiro, 2023", value: "2" },
    { label: "Março, 2023", value: "3" },
    { label: "Abril, 2023", value: "4" },
    { label: "Maio, 2023", value: "5" },
    { label: "Junho, 2023", value: "6" },
    { label: "Julho, 2023", value: "7" },
    { label: "Agosto, 2023", value: "8" },
    { label: "Setembro, 2023", value: "9" },
    { label: "Outubro, 2023", value: "10" },
    { label: "Novembro, 2023", value: "11" },
    { label: "Dezembro, 2023", value: "12" },
  ];

  return (
    <SafeAreaView style={styles.header}>
      {props.monthSelector && (
        <View style={styles.monthContainer}>
          <AppSelect
            data={data}
            label="Finish"
            selected="1"
            onSelect={(item) => console.log(item)}
            color={COLORS.primary}
          />
        </View>
      )}
      {props.children}
    </SafeAreaView>
  );
}

function HeaderTitle({ children }: PropsWithChildren) {
  return <Text style={styles.title}>{children}</Text>;
}

Header.Title = HeaderTitle;