import { StyleSheet } from "react-native";
import { COLORS } from "../../../theme";

export const styles = StyleSheet.create({
  bankAccountsCard: {
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
  bankAccountTitle: {
    fontSize: 16,
    color: COLORS.primary,
    fontFamily: "InterBold",
    marginBottom: 2,
  },
  balanceTitle: {
    fontSize: 14,
    color: COLORS.text,
    fontFamily: "InterRegular",
  },
  bankImg: {
    borderRadius: 12,
    width: 24,
    height: 24,
  },
  cardText: {
    color: COLORS.primary,
    fontSize: 14,
  },
  balanceValue: {
    fontFamily: "InterSemiBold",
    fontSize: 16,
  },
  mainRow: {
    flex: 1,
  },
  bankRow: {
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
});
