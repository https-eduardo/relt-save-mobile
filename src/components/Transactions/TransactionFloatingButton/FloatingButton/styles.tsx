import { StyleSheet } from "react-native";
import { COLORS } from "../../../../theme";

export const styles = StyleSheet.create({
  floatingButtonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  floatingButton: {
    borderRadius: 64,
  },
  floatingButtonLabel: {
    fontFamily: "InterMedium",
    color: COLORS.black,
    fontSize: 14,
  },
  floatingButtonIcon: {
    color: COLORS.white,
    fontSize: 20,
  },
});
