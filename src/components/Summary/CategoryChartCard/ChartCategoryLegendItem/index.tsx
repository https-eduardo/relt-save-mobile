import { View, Text } from "react-native";
import { styles } from "./styles";
import { useMemo } from "react";
import { NumberUtils } from "../../../../utils/number";

interface ChartCategoryLegendItemProps {
  color?: string;
  name: string;
  value?: number;
}

export default function ChartCategoryLegendItem(
  props: ChartCategoryLegendItemProps
) {
  const value = useMemo(() => {
    if (props.value) return NumberUtils.formatValue(-props.value);
  }, [props.value]);

  return (
    <View style={styles.chartLegendItem}>
      <View
        style={[
          styles.chartLegendCategoryColor,
          { backgroundColor: props.color },
        ]}
      />
      <Text style={styles.chartLegendText}>
        {props.name}: <Text style={styles.chartLegendValue}>R$ {value}</Text>
      </Text>
    </View>
  );
}
