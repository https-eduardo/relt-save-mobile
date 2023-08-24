import { StyleSheet } from "react-native";
import { COLORS } from "../../../theme";

export const styles = StyleSheet.create({
  logo: {
    marginTop: 16,
  },
  subtitle: {
    fontFamily: "InterMedium",
    fontSize: 18,
    color: COLORS.text,
  },
  buttons: {
    marginTop: 32,
    gap: 16,
    padding: 32,
  },
  savingsImg: {
    resizeMode: "contain",
    width: "100%",
    height: "50%",
  },
  googleButtonContainer: {
    marginTop: 32,
    marginHorizontal: 16,
    backgroundColor: "#121212",
  },
  googleButtonText: {
    fontSize: 18,
    fontFamily: "InterSemiBold",
    color: COLORS.black,
  },
  emailButtonText: {
    fontSize: 18,
    fontFamily: "InterSemiBold",
    color: COLORS.white,
  },
  googleIcon: {
    maxWidth: 24,
    maxHeight: 24,
  },
});
