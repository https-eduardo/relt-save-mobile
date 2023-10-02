import { Text, TextStyle, View } from "react-native";
import AppBadge from "../AppBadge";
import { COLORS } from "../../theme";
import { useState, useEffect } from "react";
import { styles } from "./styles";
import { BadgeSelect } from "../../shared/interfaces/badge-select.interface";

interface AppBadgeMultiSelectProps {
  options: BadgeSelect[];
  onSelect: (options: BadgeSelect[]) => void;
  label?: string;
  color?: string;
  backgroundColor?: string;
  values?: string[];
}

export default function AppBadgeMultiSelect(props: AppBadgeMultiSelectProps) {
  const [selectedOptions, setSelectedOptions] = useState<BadgeSelect[]>([]);

  useEffect(() => {
    const defaultValues = props.options.filter((badge) =>
      props.values?.includes(badge.value)
    );
    setSelectedOptions(defaultValues);
  }, []);

  function select(option: BadgeSelect) {
    let newOptions: BadgeSelect[];
    if (isSelected(option)) {
      newOptions = selectedOptions.filter(
        (selected) => selected.value !== option.value
      );
    } else newOptions = [...selectedOptions, option];

    setSelectedOptions(newOptions);
    props.onSelect(newOptions);
  }

  function isSelected(option: BadgeSelect) {
    return !!selectedOptions.find(
      (selected) => selected.value === option.value
    );
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

  return (
    <View style={styles.optionMultiSelectContainer}>
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
