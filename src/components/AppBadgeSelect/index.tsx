import { Text, TextStyle, View } from "react-native";
import AppBadge from "../AppBadge";
import { COLORS } from "../../theme";
import { useEffect, useState } from "react";
import { styles } from "./styles";
import { BadgeSelect } from "../../shared/interfaces/badge-select.interface";

interface AppBadgeSelectProps {
  options: BadgeSelect[];
  value?: string;
  label?: string;
  color?: string;
  backgroundColor?: string;
  onSelect: (selectedOption?: string) => void;
}

export default function AppBadgeSelect(props: AppBadgeSelectProps) {
  const [selected, setSelected] = useState<BadgeSelect | null>(null);

  function select(option: BadgeSelect) {
    let newSelectedOption: BadgeSelect | null = option;
    if (isSelected(option)) newSelectedOption = null;

    setSelected(newSelectedOption);
    props.onSelect(newSelectedOption?.value);
  }

  function isSelected(option: BadgeSelect) {
    return selected?.value === option.value;
  }

  function getBadgeStyle(option: BadgeSelect) {
    const style: TextStyle = {
      fontSize: 14,
      fontFamily: "InterMedium",
      color: COLORS.text,
    };
    if (isSelected(option)) style.color = props.color;

    return style;
  }

  useEffect(() => {
    const defaultOption = props.options.find(
      (option) => option.value === props.value
    );
    setSelected(defaultOption ?? null);
  }, [props.value]);

  return (
    <View style={styles.optionSelectContainer}>
      {props.label && props.options ? (
        <Text style={styles.label}>{props.label}</Text>
      ) : null}
      <View style={styles.optionsRow}>
        {props.options.map((option) => (
          <AppBadge
            key={option.value}
            text={option.label}
            onPress={() => select(option)}
            style={getBadgeStyle(option)}
            color={isSelected(option) ? props.backgroundColor : undefined}
          />
        ))}
      </View>
    </View>
  );
}
