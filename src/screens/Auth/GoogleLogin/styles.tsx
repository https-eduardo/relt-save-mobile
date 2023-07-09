import { StyleSheet } from "react-native";
import { COLORS } from "../../../theme";

// Need refactoration in styles
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    marginTop: 16,
  },
  subtitle: {
    fontFamily: "InterMedium",
    fontSize: 18,
    color: COLORS.text,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: 32,
  },
  buttons: {
    marginTop: 32,
    gap: 16,
  },
  googleButtonContainer: {
    marginTop: 32,
    marginHorizontal: 16,
    backgroundColor: "#121212",
  },
  googleButtonText: {
    fontSize: 18,
    fontFamily: "InterSemiBold",
    color: COLORS.textWhite,
  },
  emailIcon: {
    fontSize: 18,
    fontWeight: "900",
    color: COLORS.textBlack,
  },
  emailButtonText: {
    fontSize: 18,
    fontFamily: "InterSemiBold",
    color: COLORS.textBlack,
  },
  googleIcon: {
    maxWidth: 24,
    maxHeight: 24,
  },
});
