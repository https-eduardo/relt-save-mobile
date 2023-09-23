import { StyleSheet } from "react-native";
import { COLORS } from "../../theme";

export const styles = StyleSheet.create({
  transactionsContainer: {
    flex: 1,
  },
  transactionsSearch: {
    marginTop: 8,
  },
  transactionsList: {
    flex: 1,
    margin: 16,
    gap: 16,
  },
  transactionsByDayContainer: {
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
