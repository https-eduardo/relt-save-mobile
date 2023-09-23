import { Modal, Pressable, Text, View } from "react-native";
import { styles } from "./styles";
import TransactionFilterGroup from "./FilterGroup";
import AppButton from "../../AppButton";
import AppBadge from "../../AppBadge";
import { CategoriesService } from "../../../services/categories";
import { useContext, useEffect, useState } from "react";
import { Category } from "../../../shared/interfaces/category.interface";
import AppDatePicker from "../../AppDatePicker";
import FilterOptionSelect, { Option } from "./FilterOptionSelect";
import { COLORS } from "../../../theme";
import TransactionsContext from "../../../contexts/transactions";
import { TransactionType } from "../../../shared/interfaces/transaction.interface";

interface TransactionsFilterProps {
  visible: boolean;
  onClose: () => void;
}

export default function TransactionsFilterModal(
  props: TransactionsFilterProps
) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [minDate, setMinDate] = useState<Date>();
  const [maxDate, setMaxDate] = useState<Date>();
  const [categoriesOptions, setCategoriesOptions] = useState<Option[]>([]);
  const transactionTypeOptions = [
    {
      label: "Despesas",
      value: "expenses",
      color: "#F13737",
      backgroundColor: "#F2BFBF",
    },
    {
      label: "Receitas",
      value: "incomes",
      color: "#1BBE00",
      backgroundColor: "#BCE9B8",
    },
  ];
  const context = useContext(TransactionsContext);

  function handleTransactionTypeSelect(value?: string) {
    context.updateFilters({
      type: value as TransactionType,
    });
  }

  function handleCategoriesSelect(value?: string) {
    context.updateFilters({ categoryId: value ? Number(value) : undefined });
  }

  async function fetchCategories() {
    const categories = await CategoriesService.getCategories();
    setCategories(categories);
  }

  function handleMinDateChange(date: Date) {
    setMinDate(date);
    context.updateFilters({
      minDate: date,
    });
  }
  function handleMaxDateChange(date: Date) {
    setMaxDate(date);
    context.updateFilters({
      maxDate: date,
    });
  }

  function clearFilters() {
    setMinDate(undefined);
    setMaxDate(undefined);
    context.clearFilters();
  }

  function applyFilters() {
    context.applyFilters();
    props.onClose();
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const categoriesOptions = categories.map((category) => ({
      label: category.name,
      value: category.id.toString(),
      backgroundColor: category.color,
      color: COLORS.white,
    }));
    setCategoriesOptions(categoriesOptions);
  }, [categories]);

  return (
    <Modal visible={props.visible} transparent animationType="none">
      <Pressable style={styles.overlay} onPress={props.onClose}></Pressable>
      <View style={styles.filterContainer}>
        <View style={styles.filterContainerHeader}>
          <Text style={styles.title}>Filtrar</Text>
          <Text onPress={clearFilters} style={styles.clearFilterText}>
            Limpar filtros
          </Text>
        </View>
        <TransactionFilterGroup label="Tipo">
          <FilterOptionSelect
            options={transactionTypeOptions}
            onSelect={handleTransactionTypeSelect}
            default={context.filters.type}
          />
        </TransactionFilterGroup>
        <TransactionFilterGroup label="Categorias">
          <FilterOptionSelect
            options={categoriesOptions}
            onSelect={handleCategoriesSelect}
            default={context.filters.categoryId?.toString()}
          />
        </TransactionFilterGroup>
        <AppDatePicker
          label="Data inicial"
          placeholder="Opcional"
          value={minDate}
          style={styles.datePicker}
          onChange={handleMinDateChange}
        />
        <AppDatePicker
          label="Data limite"
          placeholder="Opcional"
          value={maxDate}
          style={styles.datePicker}
          onChange={handleMaxDateChange}
        />
        <AppButton
          style={styles.button}
          primary
          onPress={applyFilters}
          text="Aplicar"
        />
      </View>
    </Modal>
  );
}
