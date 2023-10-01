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
import { EmptyFieldError } from "../../../shared/errors/empty-field.error";
import { InvalidValueError } from "../../../shared/errors/invalid-value.error";
import { useContext, useEffect, useState } from "react";
import { CategoriesService } from "../../../services/categories";
import { VALIDATION_RULES } from "../../../constants";
import { useValidatedState } from "vuct-validator/react";
import { ValidationError } from "vuct-validator";
import AlertContext from "../../../contexts/alert";
import { ErrorUtils } from "../../../utils/error";
import { styles } from "./styles";
import {
  AlertType,
  BadgeSelect,
  TextInputChange,
  TransactionData,
  TransactionPaymentType,
} from "../../../shared/interfaces";
import { useNavigation } from "@react-navigation/native";

export default function TransactionForm() {
  const alert = useContext(AlertContext);
  const { navigate } = useNavigation();
  const [errors, setErrors] = useState<ValidationError>({});
  const [categories, setCategories] = useState<number[]>([]);
  const [userCategoriesOptions, setUserCategoriesOptions] = useState<
    BadgeSelect[]
  >([]);
  const paymentTypeOptions: BadgeSelect[] = [
    { label: "Dinheiro Físico", value: "PHYSICAL_MONEY" },
    { label: "Cartão", value: "CARD" },
    { label: "Saldo de conta", value: "BALANCE" },
  ];

  const [paymentType, setPaymentType] =
    useState<TransactionPaymentType>("PHYSICAL_MONEY");

  function handleValidationError(error: ValidationError) {
    setErrors((prevState) => ({ ...prevState, ...error }));
  }

  const [paymentDate, setPaymentDate] = useState(new Date());

  const [name, setName] = useValidatedState(
    { name: "name", value: "" },
    VALIDATION_RULES.transactionName,
    handleValidationError
  );

  const [installments, setInstallments] = useValidatedState(
    { name: "installments", value: 1 },
    VALIDATION_RULES.positiveValue,
    handleValidationError
  );

  const [description, setDescription] = useState("");

  const [value, setValue] = useValidatedState(
    { name: "value", value: "R$ 0,00" },
    VALIDATION_RULES.positiveValue,
    handleValidationError
  );

  function handleNameChange(ev: TextInputChange) {
    setName(ev.nativeEvent.text);
  }

  function handleDescriptionChange(ev: TextInputChange) {
    setDescription(ev.nativeEvent.text);
  }

  function handleCategoriesSelect(categories: BadgeSelect[]) {
    const ids = categories.map((category) => Number(category.value));
    setCategories(ids);
  }

  function handlePaymentTypeSelect(paymentType?: string) {
    setPaymentType(paymentType as TransactionPaymentType);
  }

  function handleDueDateChange(date: Date) {
    setPaymentDate(date);
  }

  function handleValueChange(ev: TextInputChange) {
    let newValue = NumberUtils.unformat(ev.nativeEvent.text);
    if (isNaN(newValue)) return;

    if (ev.nativeEvent.text.length < value.length) {
      newValue /= 10;
    } else newValue *= 10;

    const formattedValue = NumberUtils.formatValue(newValue, "never");
    // Not a good practice, gonna be improved in the future
    setValue(`R$ ${formattedValue}`);
  }

  function handleInstallmentsChange(ev: TextInputChange) {
    const newValue = Number(ev.nativeEvent.text);
    if (isNaN(newValue)) return;

    setInstallments(newValue);
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

  useEffect(() => {
    fetchCategories();
  }, []);

  async function handleSubmit() {
    try {
      const numericValue = NumberUtils.unformat(value);
      if (ErrorUtils.hasAnyEmptyField(name, description) || numericValue <= 0)
        throw new EmptyFieldError();
      if (ErrorUtils.hasAnyError(errors)) throw new InvalidValueError();

      const date =
        installments > 1 ? { dueDate: paymentDate } : { paidAt: paymentDate };
      const body: TransactionData = {
        name,
        description,
        value: numericValue,
        paymentType,
        categories,
        installments,
        ...date,
      };
      await TransactionsService.create(body);
      navigate("Transactions");
    } catch (error) {
      const msg = ErrorUtils.getErrorMessage(error);

      alert.update({
        text: msg ?? CANNOT_REGISTER_TRANSACTION,
        type: AlertType.ERROR,
      });
    }
  }

  return (
    <View style={styles.transactionsRegisterContainer}>
      <Text style={styles.title}>Nova receita</Text>
      <View style={styles.inputs}>
        <AppTextInput
          label="Nome"
          placeholder="Mercado"
          value={name}
          onChange={handleNameChange}
          errorMessage={errors.name}
        />
        <AppTextInput
          label="Descrição"
          placeholder="Compra semanal que fiz no mercado"
          value={description}
          onChange={handleDescriptionChange}
        />
        <View style={styles.valueGroup}>
          <AppTextInput
            label="Valor"
            block
            value={value}
            onChange={handleValueChange}
            errorMessage={errors.value}
            keyboardType={"numeric"}
          />
          <AppTextInput
            block
            label="Número de parcelas"
            value={installments.toString()}
            keyboardType="numeric"
            onChange={handleInstallmentsChange}
            errorMessage={errors.installments}
          />
        </View>
        <AppBadgeSelect
          label="Tipo de pagamento"
          options={paymentTypeOptions}
          onSelect={handlePaymentTypeSelect}
          backgroundColor={COLORS.primary}
          color={COLORS.white}
        />
        <AppBadgeMultiSelect
          label="Categorias"
          options={userCategoriesOptions}
          onSelect={handleCategoriesSelect}
          backgroundColor={COLORS.black}
          color={COLORS.white}
        />
        <AppDatePicker
          value={paymentDate}
          onChange={handleDueDateChange}
          label="Dia do pagamento"
        />
        <AppButton primary onPress={handleSubmit} text="Salvar" />
      </View>
    </View>
  );
}
