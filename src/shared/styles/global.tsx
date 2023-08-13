import { StyleSheet } from "react-native";
import { COLORS } from "../../theme";

export const globalStyles = StyleSheet.create({
  texts: {
    gap: 4,
  },
  title: {
    fontFamily: "InterBold",
    fontSize: 28,
    color: COLORS.primary,
  },
  subtitle: {
    fontFamily: "InterMedium",
    fontSize: 16,
    color: COLORS.text,
  },
});
