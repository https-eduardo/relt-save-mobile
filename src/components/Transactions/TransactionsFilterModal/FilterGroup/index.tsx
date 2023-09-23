import { Text, View } from "react-native";
import { styles } from "./styles";
import { PropsWithChildren } from "react";

interface TransactionFilterGroupProps extends PropsWithChildren {
  label: string;
}

export default function TransactionFilterGroup(
  props: TransactionFilterGroupProps
) {
  return (
    <View style={styles.transactionType}>
      <Text style={styles.filterGroupText}>{props.label}</Text>
      {props.children}
    </View>
  );
}
