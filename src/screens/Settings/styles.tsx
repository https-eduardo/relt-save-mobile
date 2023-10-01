import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  settingsContainer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.bgScreen,
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  title: {
    marginHorizontal: 24,
    paddingVertical: 16,
    color: COLORS.text,
    fontFamily: 'InterBold',
    fontSize: 16
  },
  buttonsContainer: {
    paddingHorizontal: 24,
  },
  reportButton: {
    color: COLORS.yellow
  },
  deleteButton: {
    color: COLORS.red,
  }
});