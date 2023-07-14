import { StyleSheet } from 'react-native';
import { COLORS } from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 24
  },
  texts: {
    gap: 4,
  },
  title: {
    fontFamily: 'InterBold',
    fontSize: 28,
    color: COLORS.primary
  },
  subtitle: {
    fontFamily: 'InterMedium',
    fontSize: 16,
    color: COLORS.text
  },
  inputs: {
    gap: 8,
    marginVertical: 16
  }
});