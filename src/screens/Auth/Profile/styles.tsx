import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  profileImg: {
    width: 64,
    height: 64,
  },
  button: {
    marginTop: 8,
    alignSelf: "stretch",
  },
  waveBorder: {
    position: "absolute",
    width: "100%",
    top: 0,
  },
});
