import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  h1: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    fontSize: 20,
    fontFamily: "InterBold",
  },
  spendingContainer: {
    paddingHorizontal: 24,
    paddingBottom: 16,
    borderBottomColor: "#ccc",
    borderBottomWidth: 2,
  },
  spendingTypeText: {
    fontFamily: "InterMedium",
    fontSize: 18,
  },
  spendingValueText: {
    fontFamily: "InterMedium",
    fontSize: 18,
    color: "#121212",
  },
  actions: {
    marginTop: 16,
    gap: 16,
  },
  iconButtons: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  iconButton: {
    backgroundColor: "#dedede",
    borderRadius: 16,
    flexDirection: "column",
    flexBasis: "0%",
    flexGrow: 1,
    paddingVertical: 16,
    paddingHorizontal: 4,
  },
  iconButtonText: {
    fontSize: 14,
  },
});
