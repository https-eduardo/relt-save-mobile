import { Text, View } from "react-native";
import AppTextInput from "../../AppTextInput";
import AppBadgeSelect from "../../AppBadgeSelect";
import AppBadgeMultiSelect from "../../AppBadgeMultiSelect";
import AppDatePicker from "../../AppDatePicker";
import AppButton from "../../AppButton";
import { COLORS } from "../../../theme";
import { CANNOT_REGISTER_TRANSACTION } from "../../../constants/messages";
import { TransactionsService } from "../../../services/transactions";
import { NumberUtils } from "../../../utils/number";
import { useContext, useEffect, useMemo, useState } from "react";
import { CategoriesService } from "../../../services/categories";
import AlertContext from "../../../contexts/alert";
import { ErrorUtils } from "../../../utils/error";
import { styles } from "./styles";
import {
  AlertType,
  BadgeSelect,
  TransactionData,
  TransactionFormData,
  TransactionFormProps,
  TransactionPaymentType,
} from "../../../shared/interfaces";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { transactionSchema } from "../../../validation/schemas/transaction.schema";
import PaymentTypeOption from "./PaymentTypeOption";

export default function TransactionForm(props: TransactionFormProps) {
  const alert = useContext(AlertContext);
  const { navigate } = useNavigation();
  const [userCategoriesOptions, setUserCategoriesOptions] = useState<
    BadgeSelect[]
  >([]);
  const paymentTypeOptions: BadgeSelect[] = [
    { label: "Dinheiro Físico", value: "PHYSICAL_MONEY" },
    { label: "Cartão", value: "CARD" },
    { label: "Saldo de conta", value: "BALANCE" },
  ];

  const {
    setValue,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm({ resolver: yupResolver(transactionSchema) });

  useEffect(() => {
    fetchCategories();
  }, []);

  function handleCategoriesSelect(categories: BadgeSelect[]) {
    const ids = categories.map((category) => Number(category.value));
    setValue("categories", ids);
  }

  function handleValueChange(text: string) {
    let newValue = NumberUtils.unformat(text);
    if (isNaN(newValue)) return;
    const { value } = getValues();
    if (text.length < value.length) {
      newValue /= 10;
    } else newValue *= 10;

    const formattedValue = NumberUtils.formatValue(newValue, "never");
    // Not a good practice, gonna be improved in the future
    setValue("value", `R$ ${formattedValue}`);
  }

  function handleInstallmentsChange(text: string) {
    const newValue = Number(text);
    if (isNaN(newValue)) return;

    setValue("installments", newValue);
  }

  function getCategoriesValue(value?: number[]) {
    return value?.map((id) => id.toString());
  }

  async function fetchCategories() {
    try {
      const categories = await CategoriesService.getCategories();
      const categoriesOptions = categories.map((category) => ({
        label: category.name,
        value: category.id.toString(),
      }));
      setUserCategoriesOptions(categoriesOptions);
    } catch {}
  }

  async function onSubmit({
    name,
    value,
    description,
    installments,
    paymentDate,
    categories,
    paymentType,
    cardId,
    bankAccountId,
  }: TransactionFormData) {
    try {
      let numericValue = NumberUtils.unformat(value);

      if (props.type === "NEW_EXPENSE") numericValue = -numericValue;
      if (props.type === "EDIT") {
        const editTransactionValue = props.transaction?.value;
        if (editTransactionValue && editTransactionValue < 0)
          numericValue = -numericValue;
      }

      const date =
        installments > 1 ? { dueDate: paymentDate } : { paidAt: paymentDate };
      const body: TransactionData = {
        name,
        description,
        value: numericValue,
        paymentType: paymentType as TransactionPaymentType,
        categories: categories as number[],
        installments,
        cardId,
        bankAccountId,
        ...date,
      };

      if (props.type === "EDIT" && props.transaction)
        await TransactionsService.updateById(props.transaction.id, body);
      else await TransactionsService.create(body);
      navigate("Transactions");
    } catch (error) {
      const msg = ErrorUtils.getErrorMessage(error);

      alert.update({
        text: msg ?? CANNOT_REGISTER_TRANSACTION,
        type: AlertType.ERROR,
      });
    }
  }

  const formTitle = useMemo(() => {
    switch (props.type) {
      case "NEW_EXPENSE":
        return "Nova despesa";
      case "NEW_INCOME":
        return "Nova receita";
      case "EDIT":
        const value = props.transaction?.value;
        if (value) {
          if (value > 0) return "Editar receita";
          return "Editar despesa";
        }
    }
  }, [props.type, props.transaction]);

  return (
    <View style={styles.transactionsRegisterContainer}>
      <Text style={styles.title}>{formTitle}</Text>
      <View style={styles.inputs}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <AppTextInput
              label="Nome"
              placeholder="Mercado"
              value={field.value}
              onChangeText={field.onChange}
              errorMessage={errors.name?.message}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <AppTextInput
              label="Descrição"
              placeholder="Compra semanal que fiz no mercado"
              value={field.value}
              onChangeText={field.onChange}
              errorMessage={errors.description?.message}
            />
          )}
        />
        <View style={styles.valueGroup}>
          <Controller
            name="value"
            defaultValue={"R$ 00,00"}
            control={control}
            render={({ field }) => (
              <AppTextInput
                label="Valor"
                block
                onChangeText={handleValueChange}
                value={field.value}
                errorMessage={errors.value?.message}
                keyboardType="numeric"
              />
            )}
          />
          <Controller
            name="installments"
            control={control}
            defaultValue={1}
            render={({ field }) => (
              <AppTextInput
                block
                label="Número de parcelas"
                value={field.value.toString()}
                keyboardType="numeric"
                onChangeText={handleInstallmentsChange}
                errorMessage={errors.installments?.message}
              />
            )}
          />
        </View>
        <Controller
          name="paymentType"
          control={control}
          render={({ field }) => (
            <AppBadgeSelect
              label="Tipo de pagamento"
              options={paymentTypeOptions}
              value={field.value}
              onSelect={field.onChange}
              backgroundColor={COLORS.primary}
              color={COLORS.white}
            />
          )}
        />
        <PaymentTypeOption control={control} />
        <Controller
          name="categories"
          control={control}
          render={({ field }) => (
            <AppBadgeMultiSelect
              label="Categorias"
              options={userCategoriesOptions}
              values={getCategoriesValue(field.value as number[] | undefined)}
              onSelect={handleCategoriesSelect}
              backgroundColor={COLORS.black}
              color={COLORS.white}
            />
          )}
        />
        <Controller
          name="paymentDate"
          control={control}
          defaultValue={new Date()}
          render={({ field }) => (
            <AppDatePicker
              value={field.value}
              onChange={field.onChange}
              label="Dia do pagamento"
            />
          )}
        />
        <AppButton primary onPress={handleSubmit(onSubmit)} text="Salvar" />
      </View>
    </View>
  );
}
