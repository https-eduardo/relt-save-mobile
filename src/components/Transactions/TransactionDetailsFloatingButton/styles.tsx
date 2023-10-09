import { StyleSheet } from "react-native";
import { COLORS } from "../../../theme";

export const styles = StyleSheet.create({
  transactionsFloatingButtons: {
    display: "flex",
    flexDirection: "column-reverse",
    position: "absolute",
    alignItems: "flex-end",
    bottom: 16,
    right: 16,
    gap: 16,
  },
  transactionsOptions: {
    alignItems: "flex-end",
    gap: 16,
  },
  transactionsOptionButton: {
    backgroundColor: COLORS.bgInput,
  },
  editTransactionButton: {
    color: COLORS.primary,
  },
  deleteTransactionButton: {
    color: COLORS.red,
  },
});
