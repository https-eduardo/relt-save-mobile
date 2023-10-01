import { StyleSheet } from "react-native";
import { COLORS } from '../../../theme';

export const styles = StyleSheet.create({
  transactionsRegisterContainer: {
    flex: 1,
    marginHorizontal: 24,
    paddingVertical: 16,
    gap: 16,
  },
  title: {
    color: COLORS.primary,
    fontSize: 24,
    fontFamily: "InterBold",
  },
  valueGroup: {
    flex: 1,
    flexDirection: "row",
    gap: 16,
    justifyContent: "space-between",
    alignContent: "stretch",
  },
  inputs: {
    gap: 16,
  },
});
