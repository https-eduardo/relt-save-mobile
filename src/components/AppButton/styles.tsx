import { StyleSheet } from "react-native";
import { COLORS } from "../../theme";

export const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    padding: 16,
    backgroundColor: COLORS.bgButton,
    borderRadius: 4,
  },
  buttonText: {
    backgroundColor: "transparent",
    fontSize: 18,
    fontFamily: "InterMedium",
  },
  primary: {
    backgroundColor: COLORS.primary,
    color: COLORS.textWhite,
  },
  secondary: {
    backgroundColor: COLORS.textBlack,
    color: COLORS.textWhite,
  },
  block: {
    width: "100%",
  },
});
