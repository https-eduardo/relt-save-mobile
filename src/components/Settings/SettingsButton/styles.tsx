import { StyleSheet } from 'react-native';
import { COLORS } from '../../../theme';

export const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 0,
    backgroundColor: 'transparent',
    justifyContent: 'flex-start'
  },
  buttonText: {
    color: COLORS.text,
    fontFamily: 'InterMedium'
  },
  buttonIcon: {
    color: COLORS.text,
    fontSize: 16,
  }
});