import { StyleSheet } from "react-native";
import { COLORS } from "../../../theme";

export const styles = StyleSheet.create({
  searchInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    fontFamily: "InterMedium",
    paddingLeft: 32,
    backgroundColor: COLORS.bgInput,
    borderRadius: 8,
    padding: 8,
  },
  searchIcon: {
    left: -16,
    color: COLORS.text,
    fontSize: 18,
  },
  filterIcon: {
    color: COLORS.text,
    fontSize: 18,
    right: 8,
  },
  searchInput: {
    flex: 1,
    color: COLORS.text,
    fontSize: 16,
  },
});
