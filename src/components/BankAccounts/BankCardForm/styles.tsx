import { StyleSheet } from "react-native";
import { COLORS } from "../../../theme";

export const styles = StyleSheet.create({
  bankCardForm: {
    flex: 1,
    marginHorizontal: 24,
    paddingVertical: 16,
    gap: 16,
  },
  inputs: {
    gap: 16,
  },
  title: {
    color: COLORS.primary,
    fontSize: 24,
    fontFamily: "InterBold",
  },
});
