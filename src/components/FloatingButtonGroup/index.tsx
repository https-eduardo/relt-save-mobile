import { View } from "react-native";
import { styles } from "./styles";
import { PropsWithChildren, useState } from "react";
import AppFloatingButton from "../AppFloatingButton";
import { useNavigation } from "@react-navigation/native";

export default function FloatingButtonGroup({ children }: PropsWithChildren) {
  const [optionsOpen, setOptionsOpen] = useState(false);

  function toggleOptionsButtons() {
    setOptionsOpen(!optionsOpen);
  }

  return (
    <View style={styles.floatingButtonGroups}>
      <AppFloatingButton
        icon="add-outline"
        onPress={toggleOptionsButtons}
        primary
        style={{ transform: optionsOpen ? [{ rotate: "45deg" }] : [] }}
      />
      <View
        style={[styles.options, { display: optionsOpen ? "flex" : "none" }]}
      >
        {children}
      </View>
    </View>
  );
}
