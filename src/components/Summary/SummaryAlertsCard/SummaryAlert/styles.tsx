import { StyleSheet } from "react-native";
import { COLORS } from "../../../../theme";

export const styles = StyleSheet.create({
  summaryAlert: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 8,
  },
  summaryAlertTexts: {
    flex: 1,
  },
  summaryAlertBoldText: {
    color: COLORS.black,
    fontFamily: "InterSemiBold",
    fontSize: 14,
  },
  summaryAlertSubtitle: {
    color: COLORS.text,
    fontFamily: "InterMedium",
    fontSize: 12,
  },
});
