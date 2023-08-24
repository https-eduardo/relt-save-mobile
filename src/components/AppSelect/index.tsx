import React, { ReactElement, useEffect, useRef, useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  Modal,
  View,
  Pressable,
} from "react-native";
import Ionicon from "@expo/vector-icons/Ionicons";
import { styles } from "./styles";

interface SelectItem {
  label: string;
  value: string;
}

interface AppSelectProps {
  label: string;
  selected?: string;
  data: Array<SelectItem>;
  onSelect: (item: SelectItem) => void;
  color?: string;
}

export default function AppSelect(props: AppSelectProps) {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<SelectItem | null>(null);

  function toggleDropdown() {
    setVisible(!visible);
  }

  function onItemPress(item: SelectItem) {
    setSelected(item);
    props.onSelect(item);
    setVisible(false);
  }

  function renderItem({ item }: { item: SelectItem }) {
    return (
      <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
        <Text style={[styles.itemText, item === selected && styles.activeText]}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  }

  function renderDropdown() {
    return (
      <Modal visible={visible} transparent animationType="none">
        <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
          <View style={styles.dropdown}>
            <FlatList
              data={props.data}
              renderItem={renderItem}
              keyExtractor={(_, index) => index.toString()}
            />
          </View>
        </Pressable>
      </Modal>
    );
  }

  useEffect(() => {
    if (props.selected) {
      const item = props.data.find(({ value }) => value === props.selected);
      setSelected(item ?? null);
    }
  }, [props.selected]);

  return (
    <TouchableOpacity style={styles.select} onPress={toggleDropdown}>
      {renderDropdown()}
      <Text style={[styles.selectText, { color: props.color }]}>
        {(selected && selected.label) || props.label}
      </Text>
      <Ionicon name="chevron-down" size={16} style={{ color: props.color }} />
    </TouchableOpacity>
  );
}
