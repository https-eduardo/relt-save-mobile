import { StyleSheet } from "react-native";
import { COLORS } from "../../../theme";

export const styles = StyleSheet.create({
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
