import { Image } from "react-native";
import { styles } from "./styles";

interface AvatarProps {
  avatarUrl: string;
}

export default function Avatar({ avatarUrl }: AvatarProps) {
  const blankProfile = require("../../../assets/images/blank-profile.png");

  return (
    <Image
      source={{ uri: avatarUrl === "" ? blankProfile : avatarUrl }}
      style={styles.avatarImg}
    ></Image>
  );
}
