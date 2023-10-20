import { Text, View } from "react-native";
import { styles } from "./styles";
import { useMemo } from "react";
import { numberStyles } from "../../../../shared/styles/numbers.styles";
import { NumberUtils } from "../../../../utils/number";
import { SummaryAlertProps } from "../../../../shared/interfaces/summary.interface";

export default function SummaryAlert(props: SummaryAlertProps) {
  const moneyValueStyle = useMemo(() => {
    return props.value < 0 ? numberStyles.expense : numberStyles.income;
  }, [props.value]);

  const value = useMemo(() => {
    return NumberUtils.formatValue(props.value);
  }, [props.value]);

  return (
    <View style={styles.summaryAlert}>
      <View style={styles.summaryAlertTexts}>
        <Text style={styles.summaryAlertBoldText}>{props.title}</Text>
        <Text style={styles.summaryAlertSubtitle}>{props.subtitle}</Text>
      </View>
      <Text
        style={[styles.summaryAlertBoldText, moneyValueStyle, props.valueStyle]}
      >
        R$ {value}
      </Text>
    </View>
  );
}
