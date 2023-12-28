import { BackHandler, StyleSheet, Text, View } from "react-native";
import Ionicon from "@expo/vector-icons/Ionicons";
import { styles } from "./styles";
import { useMemo } from "react";
import { Alert, AlertType } from "../../shared/interfaces/alert.interface";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../theme";

interface AppAlertProps {
  alert: Alert | null;
  visible?: boolean;
  onDismiss?: () => void;
}

interface AlertStyles {
  icon: keyof typeof Ionicon.glyphMap;
  bgColor: string;
}

type AlertTypes = {
  [NAME in AlertType]: AlertStyles;
};

export default function AppAlert(props: AppAlertProps) {
  const types: AlertTypes = {
    success: {
      icon: "checkmark-outline",
      bgColor: COLORS.bgGreen,
    },
    error: {
      icon: "close-outline",
      bgColor: COLORS.bgRed,
    },
    info: {
      icon: "information-outline",
      bgColor: COLORS.primary,
    },
  };

  if (!props.alert) return null;

  const alertType = useMemo(
    () => types[(props.alert as Alert).type],
    [props.alert.type]
  );

  return (
    <View
      style={{
        display: props.visible ? "flex" : "none",
        ...styles.alert,
        backgroundColor: alertType.bgColor,
      }}
    >
      <SafeAreaView style={styles.alertContent}>
        <Ionicon
          name={alertType.icon}
          style={styles.icon}
          onPress={props.onDismiss}
        />
        <Text style={{ ...styles.text }}>{props.alert.text}</Text>
      </SafeAreaView>
    </View>
  );
}
