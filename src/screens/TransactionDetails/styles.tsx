import { StyleSheet } from "react-native";
import { COLORS } from "../../theme";

export const styles = StyleSheet.create({
  transactionScreen: {
    flex: 1,
  },
  chargesList: {
    marginHorizontal: 24,
    marginVertical: 8,
    gap: 8,
  },
  chargeTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  installments: {
    fontFamily: "InterMedium",
    fontSize: 12,
    color: COLORS.text,
  },
  chargesListTitle: {
    fontFamily: "InterMedium",
    fontSize: 16,
    color: COLORS.text,
  },
});
