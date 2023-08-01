import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme';

export const styles = StyleSheet.create({
  textInputContainer: {
    gap: 4,
    alignSelf: "stretch",
  },
  label: {
    fontSize: 16,
    fontFamily: "InterMedium",
  },
  textInput: {
    borderRadius: 4,
    fontSize: 16,
    fontFamily: "InterSemiBold",
    padding: 16,
    flex: 1,
  },
  textInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#dedede",
  },
  decorativeIcon: {
    paddingLeft: 16,
    color: COLORS.text
  },
  passwordIcon: {
    position: 'absolute',
    right: 16,
    color: COLORS.text
  }
});
