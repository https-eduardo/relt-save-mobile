import { Text, View } from "react-native";
import { PieChart, PieChartData } from "react-native-svg-charts";
import { styles } from "./styles";
import { COLORS } from "../../../theme";
import ChartCategoryLegendItem from "./ChartCategoryLegendItem";
import { useCallback, useState, useContext, useEffect } from "react";
import { ChargesService } from "../../../services/charges";
import GlobalContext from "../../../contexts/global";
import { DateUtils } from "../../../utils/date";

export default function CategoryChardCard() {
  const { period } = useContext(GlobalContext);
  const [pieData, setPieData] = useState<PieChartData[]>([]);

  const fetchPieData = useCallback(async () => {
    const data = await ChargesService.getChargesBalanceByCategory({
      minDate: period,
      maxDate: DateUtils.getMonthMaxDate(period),
    });
    const convertedPieData = data.map((categoryBalance) => {
      return {
        key: categoryBalance.name,
        value: Math.abs(categoryBalance.value),
        svg: {
          fill: categoryBalance.color ?? COLORS.black,
          stroke: "white",
          strokeWidth: 1,
        },
      };
    });
    setPieData(convertedPieData);
  }, [period]);

  useEffect(() => {
    fetchPieData();
  }, [fetchPieData]);

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
          {pieData.map((chartElement) => (
            <ChartCategoryLegendItem
              key={chartElement.key}
              color={chartElement.svg?.fill}
              name={chartElement.key.toString()}
              value={chartElement.value}
            />
          ))}
        </View>
      </View>
    </View>
  );
}
