import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  floatingButtonGroups: {
    display: "flex",
    flexDirection: "column-reverse",
    position: "absolute",
    alignItems: "flex-end",
    bottom: 16,
    right: 16,
    gap: 16,
  },
  options: {
    alignItems: "flex-end",
    gap: 16,
  },
});
