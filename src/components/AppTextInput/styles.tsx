import { StyleSheet } from "react-native";
import { COLORS } from "../../theme";

export const styles = StyleSheet.create({
  textInputContainer: {
    gap: 4,
    alignSelf: "stretch",
  },
  label: {
    fontSize: 16,
    fontFamily: "InterMedium",
  },
  textInput: {
    fontSize: 16,
    fontFamily: "InterSemiBold",
    padding: 16,
    flex: 1,
  },
  textInputWrapper: {
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#dedede",
    borderWidth: 1,
    borderColor: "transparent",
  },
  decorativeIcon: {
    paddingLeft: 16,
    color: COLORS.text,
  },
  passwordIcon: {
    position: "absolute",
    right: 16,
    color: COLORS.text,
  },
  error: {
    borderColor: COLORS.red,
    borderWidth: 1,
  },
  errorMessage: {
    color: COLORS.red,
    fontSize: 12,
  },
});
