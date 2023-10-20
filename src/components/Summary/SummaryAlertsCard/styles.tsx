import { StyleSheet } from "react-native";
import { COLORS } from "../../../theme";

export const styles = StyleSheet.create({
  alertsCardWrapper: {
    marginTop: 8,
    marginHorizontal: 16,
    gap: 12,
  },
  alertsCardContainer: {
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 16,
    shadowColor: COLORS.shadowColor,
    elevation: 3,
    backgroundColor: COLORS.white,
    paddingVertical: 8,
    borderRadius: 8,
  },
  alertsCardTitle: {
    fontSize: 16,
    color: COLORS.text,
    fontFamily: "InterSemiBold",
  },
  separator: {
    borderBottomColor: COLORS.bgInput,
    borderBottomWidth: 1,
  },
});
