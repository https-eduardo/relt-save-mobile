import { StyleSheet } from 'react-native';

 // Need refactoration in styles
 export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  waveBorder: {
    position: "absolute",
    width: "100%",
    top: 0,
  },
  savingsImg: {
    maxWidth: 256,
    maxHeight: 256,
  },
  logo: {
    marginLeft: 16,
  },
  subtitle: {
    fontFamily: "InterMedium",
    fontSize: 18,
    marginHorizontal: 16,
  },
  content: {
    flex: 1,
    gap: 8,
    justifyContent: "center",
    padding: 16,
  },
  googleButtonContainer: {
    marginTop: 32,
    marginHorizontal: 16,
    backgroundColor: "#121212",
  },
  googleButtonText: {
    color: "#efefef",
  },
  appleButtonContainer: {
    backgroundColor: "#000000",
  },
  appleButtonText: {
    color: "#eee",
  },
});
