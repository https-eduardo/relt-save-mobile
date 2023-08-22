import { Image } from "react-native";
import { styles } from "./styles";

interface AvatarProps {
  url: string;
  size?: "big" | "medium" | "small";
}

export default function Avatar({ url, size = "small" }: AvatarProps) {
  const blankProfile = require("../../../assets/images/blank-profile.png");

  return (
    <Image
      source={url === "" ? blankProfile : { uri: url }}
      style={{ ...styles.avatarImg, ...styles[size] }}
    ></Image>
  );
}
