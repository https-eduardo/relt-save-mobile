import { StyleSheet } from "react-native";
import { COLORS } from "../../theme";

export const styles = StyleSheet.create({
  avatarImg: {
    borderColor: COLORS.primary,
  },
  big: {
    width: 96,
    height: 96,
    borderRadius: 24,
    borderWidth: 4,
  },
  medium: {
    width: 64,
    height: 64,
    borderRadius: 16,
    borderWidth: 3,
  },
  small: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 2,
  },
});
