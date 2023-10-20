import { View, Text } from "react-native";
import { styles } from "./styles";

interface ChartCategoryLegendItemProps {
  color: string;
  name: string;
  value: string;
}

export default function ChartCategoryLegendItem(
  props: ChartCategoryLegendItemProps
) {
  return (
    <View style={styles.chartLegendItem}>
      <View
        style={[
          styles.chartLegendCategoryColor,
          { backgroundColor: props.color },
        ]}
      />
      <Text style={styles.chartLegendText}>
        {props.name}: <Text style={styles.chartLegendValue}>{props.value}</Text>
      </Text>
    </View>
  );
}
