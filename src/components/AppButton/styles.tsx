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
    fontFamily: "InterSemiBold",
  },
  primary: {
    backgroundColor: COLORS.primary,
    color: COLORS.white,
  },
  secondary: {
    backgroundColor: COLORS.black,
    color: COLORS.white,
  },
  block: {
    width: "100%",
  },
});
