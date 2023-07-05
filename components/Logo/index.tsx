import { Text, TextStyle } from "react-native";
import { useTheme } from "@react-navigation/native";

export default function Logo({ style }: { style: TextStyle }) {
  const { colors } = useTheme();
  return (
    <Text
      style={{
        color: colors.primary,
        fontSize: 32,
        fontFamily: "InterBold",
        ...style,
      }}
    >
      Relt<Text style={{ color: colors.text }}>Save</Text>
    </Text>
  );
}
