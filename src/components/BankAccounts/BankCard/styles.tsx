import { StyleSheet } from "react-native";
import { COLORS } from "../../../theme";

export const styles = StyleSheet.create({
  bankCard: {
    padding: 16,
    flexDirection: "row",
    borderRadius: 8,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 16,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.shadowColor,
    justifyContent: "space-between",
  },
  cardNameContainer: {
    alignItems: "flex-start",
    gap: 4,
  },
  bankCardName: {
    color: COLORS.primary,
    fontSize: 16,
    fontFamily: "InterSemiBold",
  },
  cardNumberContainer: {
    alignItems: "flex-end",
  },
  cardNumberText: {
    color: COLORS.text,
    fontFamily: "InterMedium",
    fontSize: 12,
  },
  cardNumber: {
    color: COLORS.primary,
    fontFamily: "InterSemiBold",
    fontSize: 16,
  },
  deleteButton: {
    padding: 12,
  },
  deleteButtonText: {
    fontSize: 16,
  },
});
