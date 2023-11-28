import { StyleSheet } from "react-native";
import { COLORS } from "../../theme";

export const styles = StyleSheet.create({
  select: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    zIndex: 1,
    paddingHorizontal: 16,
    backgroundColor: COLORS.bgInput,
    borderRadius: 4,
  },
  selectText: {
    fontFamily: "InterMedium",
    marginRight: 4,
    fontSize: 16,
  },
  dropdown: {
    position: "absolute",
    backgroundColor: COLORS.white,
    width: "100%",
    padding: 16,
    bottom: 0,
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
    maxHeight: "80%",
    minHeight: 150,
  },
  overlay: {
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.blurColor,
  },
  item: {
    padding: 8,
  },
  activeText: {
    color: COLORS.primary,
  },
  itemText: {
    fontSize: 18,
    fontFamily: "InterMedium",
  },
});
