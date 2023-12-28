import { Modal, Pressable, Text, View } from "react-native";
import { styles } from "./styles";
import { PropsWithChildren } from "react";

interface AppDialogProps extends PropsWithChildren {
  title?: string;
  visible: boolean;
  onDismiss: () => void;
}

export default function AppDialog(props: AppDialogProps) {
  return (
    <Modal visible={props.visible} transparent animationType="none">
      <Pressable style={styles.overlay} onPress={props.onDismiss} />
      <View style={styles.dialog}>
        <Text style={styles.dialogTitle}>{props.title}</Text>
        <View style={styles.buttons}>{props.children}</View>
      </View>
    </Modal>
  );
}
