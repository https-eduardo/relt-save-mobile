import { StyleSheet } from "react-native";
import { COLORS } from "../../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 32,
  },
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
  inputs: {
    gap: 8,
    marginVertical: 16,
  },
  returnIconContainer: {
    top: 32,
    position: "absolute",
  },
});
