import { StyleSheet } from "react-native";
import { COLORS } from "../../theme";

export const transactionsStyles = StyleSheet.create({
  expense: {
    color: COLORS.red,
  },
  income: {
    color: COLORS.green,
  },
  valueText: {
    fontFamily: "InterSemiBold",
    fontSize: 14,
  },
});
