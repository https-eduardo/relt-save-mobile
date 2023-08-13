import { StyleSheet } from "react-native";
import { COLORS } from "../../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 32,
  },
  inputs: {
    gap: 2,
    marginTop: 24,
    marginBottom: 2,
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
  },
  buttonContainer: {
    marginTop: 16,
    gap: 8,
  },
  register: {
    textAlign: "center",
    color: COLORS.text,
    fontFamily: "InterRegular",
  },
  registerLink: {
    color: COLORS.primary,
    fontFamily: "InterSemiBold",
  },
  forgotPassword: {
    color: COLORS.primary,
    fontFamily: "InterSemiBold",
  },
});
