import { StyleSheet } from "react-native";
import { COLORS } from "../../theme";

export const globalStyles = StyleSheet.create({
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
});
