import { useState } from "react";
import Ionicon from "@expo/vector-icons/Ionicons";
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { styles } from "./styles";
import TransactionsFilterModal from "../TransactionsFilterModal";

interface TransactionSearchProps {
  style?: ViewStyle;
}

export default function TransactionsSearch(props: TransactionSearchProps) {
  const [searchText, setSearchText] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);

  function handleSearchTextChange(
    ev: NativeSyntheticEvent<TextInputChangeEventData>
  ) {
    setSearchText(ev.nativeEvent.text);
  }

  function toggleTransactionsFilterModal() {
    setFilterModalOpen(!filterModalOpen);
  }

  return (
    <View style={[styles.searchInputWrapper, props.style]}>
      <TransactionsFilterModal
        visible={filterModalOpen}
        onClose={toggleTransactionsFilterModal}
      />
      <Ionicon name="search-outline" style={styles.searchIcon} />
      <TextInput
        value={searchText}
        placeholder="Pesquisar"
        onChange={handleSearchTextChange}
        style={styles.searchInput}
      />
      <TouchableOpacity onPress={toggleTransactionsFilterModal}>
        <Ionicon name="filter-outline" style={styles.filterIcon} />
      </TouchableOpacity>
    </View>
  );
}
