import { StyleSheet } from "react-native";
import { COLORS } from "../../../theme";

export const styles = StyleSheet.create({
  bankAccountScreen: {
    flex: 1,
  },
  cardsTitle: {
    color: COLORS.text,
    fontFamily: "InterSemiBold",
    fontSize: 16,
  },
  cardsList: {
    marginHorizontal: 24,
    marginVertical: 8,
    gap: 8,
  },
});
