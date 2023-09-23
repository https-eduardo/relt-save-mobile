import { StyleSheet } from "react-native";
import { COLORS } from "../../../theme";

export const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    gap: 24,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 16,
    shadowColor: COLORS.shadowColor,
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 8,
    justifyContent: "center",
  },
  mainRow: {
    flex: 1,
  },
  valueRow: {
    alignItems: "flex-end",
  },
  title: {
    color: COLORS.black,
    fontFamily: "InterBold",
    fontSize: 16,
  },
  description: {
    color: COLORS.text,
    fontFamily: "InterMedium",
    fontSize: 14,
  },
  badges: {
    flexDirection: "row",
    marginTop: 8,
    flexWrap: "wrap",
    gap: 4,
  },
  valueText: {
    fontFamily: "InterSemiBold",
    fontSize: 14,
  },
  expense: {
    color: COLORS.red,
  },
  income: {
    color: COLORS.green,
  },
  createdDateText: {
    color: COLORS.text,
    fontFamily: "InterRegular",
    fontSize: 12,
  },
});
