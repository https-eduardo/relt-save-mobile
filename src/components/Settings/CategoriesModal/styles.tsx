import { StyleSheet } from "react-native";
import { COLORS } from "../../../theme";

export const styles = StyleSheet.create({
  title: {
    color: COLORS.black,
    fontSize: 20,
    fontFamily: "InterBold",
    marginBottom: 8,
  },
  newCategoryTitle: {
    color: COLORS.primary,
    fontSize: 18,
    fontFamily: "InterBold",
    marginBottom: 8,
  },
  newCategoryContainer: {
    marginTop: 16,
    borderTopColor: COLORS.border,
    paddingTop: 8,
    borderTopWidth: 1,
  },
  newCategoryForm: {
    flexDirection: "row",
    width: "100%",
    gap: 16,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  overlay: {
    flex: 1,
    width: "100%",
    backgroundColor: COLORS.blurColor,
    height: "100%",
  },
  content: {
    borderRadius: 8,
    backgroundColor: COLORS.white,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 16,
    shadowColor: COLORS.shadowColor,
    padding: 16,
    paddingHorizontal: 24,
  },
  editButton: {
    padding: 12,
  },
  editButtonText: {
    fontSize: 16,
  },
});
