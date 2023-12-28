import { Image, ImageStyle } from "react-native";
import { styles } from "./styles";

interface AvatarProps {
  url?: string;
  size?: "big" | "medium" | "small";
  style?: ImageStyle;
}

export default function Avatar({ url, size = "small", style }: AvatarProps) {
  const blankProfile = require("../../../assets/images/blank-profile.png");

  return (
    <Image
      source={url ? { uri: url } : blankProfile}
      style={[styles.avatarImg, styles[size], style]}
    ></Image>
  );
}
