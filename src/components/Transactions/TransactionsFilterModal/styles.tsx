import { StyleSheet } from "react-native";
import { COLORS } from "../../../theme";

export const styles = StyleSheet.create({
  filterContainer: {
    position: "absolute",
    backgroundColor: COLORS.white,
    width: "100%",
    padding: 24,
    bottom: 0,
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
    gap: 16,
  },
  filterContainerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  clearFilterText: {
    color: COLORS.primary,
    fontSize: 12,
    fontFamily: "InterRegular",
  },
  title: {
    color: COLORS.primary,
    fontSize: 24,
    fontFamily: "InterBold",
    marginBottom: 4,
  },
  overlay: {
    flex: 1,
    backgroundColor: COLORS.blurColor,
  },
  button: {
    marginTop: 8,
  },
  datePicker: {
    padding: 12,
  },
});
