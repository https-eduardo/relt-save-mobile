import { StyleSheet } from "react-native";
import { COLORS } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: COLORS.bgInput,
  },
  badgeText: {
    fontFamily: "InterRegular",
    fontSize: 12,
    color: COLORS.white,
  },
});
