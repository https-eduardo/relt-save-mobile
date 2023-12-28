import { StyleSheet } from "react-native";
import { COLORS } from "../../../theme";

export const styles = StyleSheet.create({
  chargeCard: {
    padding: 16,
    flexDirection: "row",
    borderRadius: 8,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 16,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.shadowColor,
    alignItems: "center",
  },
  mainRow: {
    flex: 1,
    gap: 2,
  },
  chargeTitle: {
    color: COLORS.black,
    fontFamily: "InterSemiBold",
    fontSize: 14,
  },
  chargeDate: {
    fontFamily: "InterRegular",
    fontSize: 12,
    color: COLORS.text,
  },
  editButton: {
    padding: 12,
  },
  editButtonText: {
    fontSize: 16,
  },
});
