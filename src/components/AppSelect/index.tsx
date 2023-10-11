import React, {
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  Modal,
  View,
  Pressable,
  ViewStyle,
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
  onSelect: (item: string) => void;
  color?: string;
  style?: ViewStyle;
}

export default function AppSelect(props: AppSelectProps) {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  function toggleDropdown() {
    setVisible(!visible);
  }

  function onItemPress(item: SelectItem) {
    setSelected(item.value);
    setVisible(false);
  }

  function renderItem({ item }: { item: SelectItem }) {
    return (
      <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
        <Text
          style={[
            styles.itemText,
            item.value === selected && styles.activeText,
          ]}
        >
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

  function getItemByValue(selectedValue: string | null) {
    return props.data.find(({ value }) => value === selectedValue);
  }

  useEffect(() => {
    let item: SelectItem | undefined = props.data[0];
    if (props.selected) item = getItemByValue(props.selected);

    setSelected(item?.value ?? null);
  }, [props.selected, props.data]);

  const selectedItem = useMemo(() => {
    return getItemByValue(selected);
  }, [selected]);

  useEffect(() => {
    if (selected) props.onSelect(selected);
  }, [selected]);

  return (
    <TouchableOpacity
      style={[styles.select, props.style]}
      onPress={toggleDropdown}
    >
      {renderDropdown()}
      <Text style={[styles.selectText, { color: props.color }]}>
        {(selected && selectedItem?.label) || props.label}
      </Text>
      <Ionicon name="chevron-down" size={16} style={{ color: props.color }} />
    </TouchableOpacity>
  );
}
