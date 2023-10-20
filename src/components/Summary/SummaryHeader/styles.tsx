import { StyleSheet } from "react-native";
import { COLORS } from "../../../theme";

export const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profile: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 0,
  },
  balanceContainer: {
    marginTop: 8,
    gap: 12,
  },
  // balanceTotalContainer: {},
  balanceTotalTitle: {
    color: COLORS.text,
    fontFamily: "InterSemiBold",
    fontSize: 16,
  },
  balanceTotalValue: {
    color: COLORS.black,
    fontFamily: "InterBold",
    fontSize: 24,
  },
  monthTransactionsResume: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 24,
  },
});
