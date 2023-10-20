import { StyleSheet } from "react-native";
import { COLORS } from "../../../../theme";

export const styles = StyleSheet.create({
  chartLegendItem: {
    flexDirection: "row",
    gap: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  chartLegendCategoryColor: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.black,
  },
  chartLegendText: {
    fontFamily: "InterSemiBold",
    fontSize: 12,
    color: COLORS.black,
  },
  chartLegendValue: {
    fontFamily: "InterMedium",
    fontSize: 12,
    color: COLORS.text,
  },
});
