import { Modal, Pressable, Text, View } from "react-native";
import { styles } from "./styles";
import TransactionFilterGroup from "./FilterGroup";
import AppButton from "../../AppButton";
import AppBadge from "../../AppBadge";
import { CategoriesService } from "../../../services/categories";
import { useContext, useEffect, useMemo, useState } from "react";
import { Category } from "../../../shared/interfaces/category.interface";
import AppDatePicker from "../../AppDatePicker";
import AppBadgeSelect from "../../AppBadgeSelect";
import { COLORS } from "../../../theme";
import TransactionsContext from "../../../contexts/transactions";
import { TransactionType } from "../../../shared/interfaces/transaction.interface";
import { BadgeSelect } from "../../../shared/interfaces/badge-select.interface";

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
  const [categoriesOptions, setCategoriesOptions] = useState<BadgeSelect[]>([]);
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
  const [transactionType, setTransactionType] = useState<
    TransactionType | undefined
  >();
  const [categoryId, setCategoryId] = useState<number | undefined>();

  function handleTransactionTypeSelect(value?: string) {
    const transactionType = value as TransactionType;
    setTransactionType(transactionType);
    context.updateFilters({
      type: transactionType,
    });
  }

  function handleCategoriesSelect(value?: string) {
    const categoryId = value ? Number(value) : undefined;
    setCategoryId(categoryId);
    context.updateFilters({ categoryId });
  }

  async function fetchCategories() {
    const categories = await CategoriesService.getAll();
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
    setCategoryId(undefined);
    setTransactionType(undefined);
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
          <AppBadgeSelect
            options={transactionTypeOptions}
            onSelect={handleTransactionTypeSelect}
            value={transactionType}
          />
        </TransactionFilterGroup>
        <TransactionFilterGroup label="Categorias">
          <AppBadgeSelect
            options={categoriesOptions}
            onSelect={handleCategoriesSelect}
            value={categoryId?.toString()}
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
