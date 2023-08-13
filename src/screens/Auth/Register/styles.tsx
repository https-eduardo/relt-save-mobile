import { StyleSheet } from "react-native";
import { COLORS } from "../../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    margin: 32,
  },
  inputs: {
    gap: 2,
    marginTop: 24,
    marginBottom: 12,
  },
  login: {
    color: COLORS.text,
    fontFamily: "InterRegular",
    marginTop: 8,
    textAlign: "center",
  },
  loginLink: {
    color: COLORS.primary,
    fontFamily: "InterSemiBold",
  },
});
