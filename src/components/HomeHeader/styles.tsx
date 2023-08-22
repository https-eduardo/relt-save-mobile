import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fa20c0",
    paddingHorizontal: 16,
    flexDirection: "row",
    paddingVertical: 16,
    gap: 16,
    alignItems: "center",
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    gap: 16,
  },
  profileIcons: {
    flexDirection: "row",
    gap: 16,
  },
  profileImg: {
    width: 48,
    height: 48,
  },
  profileImgContainer: {
    borderRadius: 50,
    overflow: "hidden",
  },
  headerGreeting: {
    color: "#121212",
    fontSize: 18,
    fontFamily: "InterSemiBold",
  },
});