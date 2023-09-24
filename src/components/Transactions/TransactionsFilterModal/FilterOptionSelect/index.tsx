import { TextStyle, View } from "react-native";
import AppBadge from "../../../AppBadge";
import { COLORS } from "../../../../theme";
import { useEffect, useState } from "react";
import { styles } from "./styles";

export interface Option {
  label: string;
  value: string;
  color?: string;
  backgroundColor?: string;
}

interface FilterOptionSelectProps {
  options: Option[];
  value?: string;
  onSelect: (selectedOption?: string) => void;
}

export default function FilterOptionSelect(props: FilterOptionSelectProps) {
  const [selected, setSelected] = useState<Option | null>(null);

  function select(option: Option) {
    let newSelectedOption: Option | null = option;
    if (isSelected(option)) newSelectedOption = null;

    setSelected(newSelectedOption);
    props.onSelect(newSelectedOption?.value);
  }

  function isSelected(option: Option) {
    return selected?.value === option.value;
  }

  function getBadgeStyle(option: Option) {
    const style: TextStyle = {
      fontSize: 14,
      fontFamily: "InterMedium",
      color: COLORS.text,
    };
    if (isSelected(option)) style.color = option.color;

    return style;
  }

  useEffect(() => {
    const defaultOption = props.options.find(
      (option) => option.value === props.value
    );
    setSelected(defaultOption ?? null);
  }, [props.value]);

  return (
    <View style={styles.multiSelectContainer}>
      {props.options.map((option) => (
        <AppBadge
          key={option.value}
          text={option.label}
          onPress={() => select(option)}
          style={getBadgeStyle(option)}
          color={isSelected(option) ? option.backgroundColor : undefined}
        />
      ))}
    </View>
  );
}
