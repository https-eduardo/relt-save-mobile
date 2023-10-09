import { StyleSheet } from "react-native";
import { COLORS } from "../../theme";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    width: "100%",
    backgroundColor: COLORS.blurColor,
    height: "100%",
  },
  dialog: {
    borderRadius: 8,
    backgroundColor: COLORS.white,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 16,
    shadowColor: COLORS.shadowColor,
    padding: 16,
    paddingHorizontal: 24,
  },
  dialogTitle: {
    fontFamily: "InterSemiBold",
    fontSize: 18,
    color: COLORS.primary,
  },
  buttons: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 24,
  },
});
