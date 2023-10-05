import { Text, View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { PropsWithChildren, useContext, useMemo } from "react";
import AppSelect from "../AppSelect";
import { COLORS } from "../../theme";
import GlobalContext from "../../contexts/global";
import { NumberUtils } from "../../utils/number";

interface HeaderProps extends PropsWithChildren {
  periodSelector?: boolean;
  style?: ViewStyle;
}

export default function Header(props: HeaderProps) {
  const { period, updatePeriod } = useContext(GlobalContext);
  // Gonna be dynamic in the future
  const data = [
    { label: "Janeiro, 2023", value: "01/2023" },
    { label: "Fevereiro, 2023", value: "02/2023" },
    { label: "Março, 2023", value: "03/2023" },
    { label: "Abril, 2023", value: "04/2023" },
    { label: "Maio, 2023", value: "05/2023" },
    { label: "Junho, 2023", value: "06/2023" },
    { label: "Julho, 2023", value: "07/2023" },
    { label: "Agosto, 2023", value: "08/2023" },
    { label: "Setembro, 2023", value: "09/2023" },
    { label: "Outubro, 2023", value: "10/2023" },
    { label: "Novembro, 2023", value: "11/2023" },
    { label: "Dezembro, 2023", value: "12/2023" },
  ];

  const selectedPeriod = useMemo(() => {
    const [month, year] = NumberUtils.formatZeros(
      period.getUTCMonth() + 1,
      period.getUTCFullYear()
    );
    return `${month}/${year}`;
  }, [period]);

  return (
    <SafeAreaView style={[styles.header, props.style]}>
      {props.periodSelector && (
        <View style={styles.monthContainer}>
          <AppSelect
            data={data}
            label="Finish"
            selected={selectedPeriod}
            style={{ backgroundColor: "transaparent" }}
            onSelect={(item) => updatePeriod(item)}
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
