import { View, Text } from "react-native";
import Ionicon from "@expo/vector-icons/Ionicons";
import { styles } from "./styles";

export interface CategoryBadgeProps {
  name: string;
  color: string;
  onRequestDelete: () => void;
}

export function CategoryBadge(props: CategoryBadgeProps) {
  return (
    <View style={styles.categoryBadge}>
      <View style={[styles.color, { backgroundColor: props.color }]} />
      <Text style={styles.name}>{props.name}</Text>
      <Ionicon
        name="close-outline"
        onPress={props.onRequestDelete}
        style={styles.icon}
      />
    </View>
  );
}
