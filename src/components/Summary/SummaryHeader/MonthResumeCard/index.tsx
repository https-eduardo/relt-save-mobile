import { StyleProp, Text, View, ViewStyle } from "react-native";
import { styles } from "./styles";
import Ionicon from "@expo/vector-icons/Ionicons";

interface MonthResumeCardProps {
  color?: string;
  icon: keyof typeof Ionicon.glyphMap;
  title: string;
  value: string;
}

export default function MonthResumeCard(props: MonthResumeCardProps) {
  return (
    <View style={styles.monthTransactionResume}>
      <Ionicon
        style={[styles.monthResumeCardIcon, { backgroundColor: props.color }]}
        name={props.icon}
      />
      <View>
        <Text style={styles.monthResumeCardTitle}>{props.title}</Text>
        <Text style={[styles.monthResumeCardValue, { color: props.color }]}>
          {props.value}
        </Text>
      </View>
    </View>
  );
}
