import { Image } from "react-native";
import { styles } from './styles';

interface AvatarProps {
  avatarUrl: string;
}

export default function Avatar({ avatarUrl }: AvatarProps) {
  const anonymousImg =
    "https://community.carbonblack.com/t5/image/serverpage/image-id/2267iC78073C23266F5D5/image-size/large/is-moderation-mode/true?v=v2&px=999";
  return (
    <Image
      source={{ uri: avatarUrl === "" ? anonymousImg : avatarUrl }}
      style={styles.avatarImg}
    ></Image>
  );
}
