import { StyleSheet } from "react-native";
import { COLORS } from "../../theme";

export const styles = StyleSheet.create({
  alert: {
    width: "100%",
  },
  alertContent: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  icon: {
    fontSize: 20,
    color: COLORS.textWhite,
  },
  text: {
    flexShrink: 1,
    fontFamily: "InterMedium",
    color: COLORS.textWhite,
  },
});
