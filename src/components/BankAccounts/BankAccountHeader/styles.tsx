import { StyleSheet } from "react-native";
import { COLORS } from "../../../theme";

export const styles = StyleSheet.create({
  bankAccountHeader: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 16,
    shadowColor: COLORS.shadowColor,
    backgroundColor: COLORS.white,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  bankAccountTitle: {
    color: COLORS.primary,
    fontSize: 24,
    fontFamily: "InterBold",
  },
  bankAccountDate: {
    color: COLORS.text,
    fontFamily: "InterRegular",
  },
  balanceValue: {
    fontFamily: "InterSemiBold",
    fontSize: 16,
  },
  balanceTitle: {
    fontSize: 16,
    color: COLORS.text,
    fontFamily: "InterBold",
  },
});
