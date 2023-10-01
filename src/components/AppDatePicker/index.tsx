import DateTimePicker from "@react-native-community/datetimepicker";
import { useMemo, useState } from "react";
import { TextStyle, TouchableOpacity } from "react-native";
import AppTextInput from "../AppTextInput";
import { DateUtils } from "../../utils/date";

interface AppDatePickerProps {
  label?: string;
  style?: TextStyle;
  value?: Date;
  placeholder?: string;
  onChange: (date: Date) => void;
}

export default function AppDatePicker(props: AppDatePickerProps) {
  const [datePickerEnabled, setDatePickerEnabled] = useState(false);

  function toggleDatePicker() {
    setDatePickerEnabled(!datePickerEnabled);
  }

  function handleDateChange(_: unknown, date?: Date) {
    setDatePickerEnabled(false);
    if (date) props.onChange(date);
  }

  const inputValue = useMemo(() => {
    if (props.value) return DateUtils.formatDate(props.value);
  }, [props.value]);

  return (
    <TouchableOpacity onPress={toggleDatePicker}>
      <AppTextInput
        style={props.style}
        label={props.label}
        placeholder={props.placeholder}
        disabled
        value={inputValue}
        icon="calendar-outline"
      />
      {datePickerEnabled && (
        <DateTimePicker
          value={props.value ?? new Date()}
          onChange={handleDateChange}
        />
      )}
    </TouchableOpacity>
  );
}
