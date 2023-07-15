import { StyleSheet } from "react-native";
import { COLORS } from "../../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 24,
  },
  texts: {
    gap: 4,
  },
  title: {
    fontWeight: "bold",
    fontSize: 28,
    color: COLORS.primary,
  },
  subtitle: {
    fontWeight: "500",
    fontSize: 16,
    color: COLORS.text,
  },
  inputs: {
    gap: 8,
    marginTop: 16,
    marginBottom: 8,
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
  },
  buttons: {
    marginTop: 16,
    gap: 8,
  },
  forgotPassword: {
    color: COLORS.primary,
    fontWeight: "600",
  },
});
