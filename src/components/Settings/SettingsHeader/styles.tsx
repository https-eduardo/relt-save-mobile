import { StyleSheet } from 'react-native';
import { COLORS } from '../../../theme';

export const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 64,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  fullname: {
    color: COLORS.primary,
    fontSize: 20,
    fontFamily: 'InterBold'
  },
  createdAt: {
    color: COLORS.text,
    fontFamily: 'InterRegular'
  },
  profile: {
    borderWidth: 0,
    borderRadius: 64,
  },
  exportButton: {
    marginTop: 16,
    padding: 8,
  },
  exportIcon: {
    color: COLORS.white,
  },
  exportText: {
    color: COLORS.white,
    fontFamily: "InterMedium"
  }
})