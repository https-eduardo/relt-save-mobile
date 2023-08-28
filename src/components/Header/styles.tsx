import { StyleSheet } from "react-native";
import { COLORS } from "../../theme";

export const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 16,
    shadowColor: COLORS.shadowColor,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    color: COLORS.primary,
    fontFamily: "InterBold",
  },
  monthContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
