import { StyleSheet } from "react-native";
import { COLORS } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    margin: 32,
  },
  texts: {
    gap: 4,
  },
  title: {
    fontFamily: "InterBold",
    fontSize: 28,
    color: COLORS.primary,
  },
  subtitle: {
    fontFamily: "InterMedium",
    fontSize: 16,
    color: COLORS.text,
  },
  buttonContainer: {
    marginTop: 16,
    gap: 8,
  },
  inputs: {
    gap: 2,
    marginTop: 24,
    marginBottom: 2,
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
  },
  avatarsContainer: {
    flexDirection: "row",
    marginVertical: 16,
    alignItems: "flex-end",
    gap: 4,
  },
});
