import { StyleSheet } from "react-native";
import { COLORS } from "../../../../theme";

export const styles = StyleSheet.create({
  monthTransactionResume: {
    flex: 1,
    flexDirection: "row",
    gap: 8,
  },
  monthResumeCardIcon: {
    backgroundColor: COLORS.bgGreen,
    padding: 8,
    borderRadius: 32,
    fontSize: 24,
  },
  monthResumeCardTitle: {
    color: COLORS.text,
    fontFamily: "InterSemiBold",
  },
  monthResumeCardValue: {
    fontFamily: "InterMedium",
    color: COLORS.bgGreen,
    fontSize: 14,
  },
});
