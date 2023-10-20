import { StyleSheet } from "react-native";
import { COLORS } from "../../../theme";

export const styles = StyleSheet.create({
  chartCardWrapper: {
    marginTop: 12,
    marginHorizontal: 16,
    gap: 12,
  },
  chartTitle: {
    fontSize: 16,
    color: COLORS.text,
    fontFamily: "InterSemiBold",
  },
  chartCardContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 16,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 16,
    elevation: 3,
    shadowColor: COLORS.shadowColor,
  },
  chart: {
    width: "40%",
    height: 100,
  },
  chartLegend: {
    flex: 1,
    alignItems: "flex-start",
  },
});
