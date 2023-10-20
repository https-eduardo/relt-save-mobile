import { Dimensions, Text, View } from "react-native";
import { PieChart, PieChartData } from "react-native-svg-charts";
import { styles } from "./styles";
import { COLORS } from "../../../theme";
import ChartCategoryLegendItem from "./ChartCategoryLegendItem";

export default function CategoryChardCard() {
  const pieData: PieChartData[] = [
    {
      key: "Padaria",
      value: 1580,
      svg: {
        fill: COLORS.black,
        stroke: "white",
        strokeWidth: 1,
      },
    },
    {
      key: "Sem categoria",
      value: 4200,
      svg: {
        fill: COLORS.text,
        stroke: "white",
        strokeWidth: 1,
      },
    },
    {
      key: "Mercado",
      value: 800,
      svg: {
        fill: COLORS.green,
        stroke: "white",
        strokeWidth: 1,
      },
    },
  ];
  return (
    <View style={styles.chartCardWrapper}>
      <Text style={styles.chartTitle}>Despesas por categoria</Text>
      <View style={styles.chartCardContainer}>
        <PieChart
          data={pieData}
          style={styles.chart}
          innerRadius={0}
          animate
          padAngle={0}
        />
        <View style={styles.chartLegend}>
          <ChartCategoryLegendItem
            color={COLORS.black}
            name="Padaria"
            value="R$ 1580,00"
          />
          <ChartCategoryLegendItem
            color={COLORS.green}
            name="Mercado"
            value="R$ 800,00"
          />
          <ChartCategoryLegendItem
            color={COLORS.text}
            name="Sem categoria"
            value="R$ 4200,00"
          />
        </View>
      </View>
    </View>
  );
}
