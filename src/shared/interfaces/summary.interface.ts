import { TextStyle } from "react-native";

export interface SummaryAlertProps {
  title: string;
  subtitle: string;
  value: number;
  valueStyle?: TextStyle;
}
