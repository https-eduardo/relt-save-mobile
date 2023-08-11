import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    margin: 32,
  },
  avatarsContainer: {
    flexDirection: "row",
    marginVertical: 16,
    alignItems: "flex-end",
    gap: 4,
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
