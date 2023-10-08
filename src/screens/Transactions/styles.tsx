import { StyleSheet } from "react-native";
import { COLORS } from "../../theme";

export const styles = StyleSheet.create({
  transactionsContainer: {
    flex: 1,
  },
  transactionsList: {
    flex: 1,
    margin: 16,
    gap: 16,
  },
  transactionsByDayContainer: {
    marginTop: 8,
    gap: 8,
  },
  transactionsDayTitle: {
    fontSize: 16,
    color: COLORS.text,
    fontFamily: "InterSemiBold",
  },
  transactionsDayList: {
    gap: 8,
  },
});
