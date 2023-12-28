import { Text, View } from "react-native";
import {
  AlertType,
  BadgeSelect,
  CardFormData,
  CardFormProps,
} from "../../../shared/interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { styles } from "./styles";
import { useContext, useEffect } from "react";
import AppTextInput from "../../AppTextInput";
import AppSelect from "../../AppSelect";
import AppButton from "../../AppButton";
import { ErrorUtils } from "../../../utils/error";
import AlertContext from "../../../contexts/alert";
import { CANNOT_CREATE_CARD } from "../../../constants";
import { useNavigation } from "@react-navigation/native";
import { bankCardSchema } from "../../../validation/schemas/bank-card.schema";
import { CardsService } from "../../../services/cards";

export default function BankCardForm(props: CardFormProps) {
  const bankCardTypes: BadgeSelect[] = [
    { label: "Crédito", value: "CREDIT" },
    { label: "Débito", value: "DEBIT" },
  ];
  const { navigate } = useNavigation();

  const alert = useContext(AlertContext);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(bankCardSchema) });

  async function onSubmit({ name, cardType, finalNumbers }: CardFormData) {
    try {
      const bankAccountId = props.bankAccountId;
      if (!bankAccountId) return;

      const data: CardFormData = {
        bankAccountId,
        name,
        cardType,
        finalNumbers,
      };

      await CardsService.create(data);
    } catch (error) {
      console.log(error);
      const msg = ErrorUtils.getErrorMessage(error);

      alert.update({
        text: msg ?? CANNOT_CREATE_CARD,
        type: AlertType.ERROR,
      });
    }
    navigate("BankAccount", { bankAccountId: props.bankAccountId });
  }

  return (
    <View style={styles.bankCardForm}>
      <Text style={styles.title}>Associar novo cartão</Text>
      <View style={styles.inputs}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <AppTextInput
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Cartão crédito do Itáu"
              label="Nome do cartão"
              errorMessage={errors.name?.message}
            />
          )}
        />
        <Controller
          name="cardType"
          control={control}
          render={({ field }) => (
            <AppSelect
              data={bankCardTypes}
              label="Tipo de cartão"
              onSelect={field.onChange}
              selected={field.value?.toString() ?? undefined}
            />
          )}
        />
        <Controller
          name="finalNumbers"
          control={control}
          render={({ field }) => (
            <AppTextInput
              label="Últimos quatro digítos do cartão"
              value={field.value}
              onChangeText={field.onChange}
              keyboardType="numeric"
              errorMessage={errors.finalNumbers?.message}
            />
          )}
        />
      </View>
      <AppButton primary onPress={handleSubmit(onSubmit)} text="Salvar" />
    </View>
  );
}
