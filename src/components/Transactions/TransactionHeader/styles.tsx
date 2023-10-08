import { StyleSheet } from "react-native";
import { COLORS } from "../../../theme";

export const styles = StyleSheet.create({
  transactionHeader: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 16,
    shadowColor: COLORS.shadowColor,
    backgroundColor: COLORS.white,
  },
  headerContent: {
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingVertical: 24,
    marginTop: 8,
  },
  mainRow: {
    flex: 1,
  },
  valueRow: {
    alignItems: "flex-end",
  },
  dateText: {
    fontFamily: "InterRegular",
    color: COLORS.text,
  },
  title: {
    color: COLORS.primary,
    fontFamily: "InterBold",
    fontSize: 24,
  },
  description: {
    color: COLORS.text,
    fontFamily: "InterRegular",
    fontSize: 14,
  },
  valueText: {
    fontFamily: "InterSemiBold",
    fontSize: 18,
  },
  badges: {
    flexDirection: "row",
    marginTop: 16,
    flexWrap: "wrap",
    gap: 4,
  },
});
