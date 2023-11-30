import { StyleSheet } from "react-native";
import { COLORS } from "../../theme";

export const styles = StyleSheet.create({
  colorPickerContainer: {
    gap: 4,
  },
  label: {
    fontSize: 16,
    fontFamily: "InterMedium",
  },
  color: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    width: 32,
    height: 32,
  },
});
