import { StyleSheet } from "react-native";
import { COLORS } from "../../../../theme";

export const styles = StyleSheet.create({
  categoryBadge: {
    backgroundColor: COLORS.bgInput,
    borderRadius: 8,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  color: {
    borderRadius: 6,
    width: 12,
    height: 12,
  },
  name: {
    color: COLORS.text,
    fontSize: 16,
    fontFamily: "InterMedium",
  },
  icon: {
    // Icon not properly centered without this margin
    marginTop: 2,
    fontSize: 18,
    color: COLORS.text,
  },
});
