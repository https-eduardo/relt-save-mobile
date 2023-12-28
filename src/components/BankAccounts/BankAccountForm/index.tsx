import { Text, View } from "react-native";
import {
  AlertType,
  BadgeSelect,
  BankAccountData,
  BankAccountFormData,
  BankAccountFormProps,
} from "../../../shared/interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { bankAccountSchema } from "../../../validation/schemas/bank-account.schema";
import { styles } from "./styles";
import { useContext, useEffect, useMemo, useState } from "react";
import AppTextInput from "../../AppTextInput";
import AppSelect from "../../AppSelect";
import BanksService from "../../../services/banks";
import AppButton from "../../AppButton";
import { BankAccountsService } from "../../../services/bank-accounts";
import { ErrorUtils } from "../../../utils/error";
import AlertContext from "../../../contexts/alert";
import {
  CANNOT_SAVE_BANK_ACCOUNT,
  INVALID_BALANCE_NUMBER,
} from "../../../constants";
import { NumberUtils } from "../../../utils/number";
import StringUtils from "../../../utils/string";
import { useNavigation } from "@react-navigation/native";

export default function BankAccountForm(props: BankAccountFormProps) {
  const [banksOptions, setBanksOptions] = useState<BadgeSelect[]>([]);
  const { navigate } = useNavigation();

  const alert = useContext(AlertContext);

  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(bankAccountSchema) });

  async function fetchBanks() {
    try {
      const banks = await BanksService.getBanks();
      const options = banks.map(({ id, name }) => ({
        label: name,
        value: id.toString(),
      }));
      setBanksOptions(options);
    } catch {}
  }

  function changeBalance(text: string) {
    const numberStr = StringUtils.formatBalanceString(text);

    setValue("balance", `R$ ${numberStr}`);
  }

  function setBankAccountValues() {
    const bankAccount = props.bankAccount;
    if (!bankAccount) return;

    setValue("name", bankAccount.name);
    setValue("bankId", bankAccount.bank.id);
    changeBalance(bankAccount.balance.toString());
  }

  const title = useMemo(() => {
    if (props.type === "NEW") return "Criar conta bancária";
    else return "Editar conta bancária";
  }, []);

  async function onSubmit({ name, balance, bankId }: BankAccountFormData) {
    try {
      const bankAccountId = props.bankAccount?.id;
      const numericBalance = NumberUtils.unformat(balance);

      if (isNaN(numericBalance)) throw new Error(INVALID_BALANCE_NUMBER);

      const body: BankAccountData = {
        bankAccountId,
        name,
        balance: numericBalance,
        bankId,
      };

      if (props.type === "NEW") await BankAccountsService.create(body);
      else if (props.type === "EDIT" && bankAccountId)
        await BankAccountsService.updateById(bankAccountId, body);
      navigate("BankAccounts");
    } catch (error) {
      const msg = ErrorUtils.getErrorMessage(error);

      alert.update({
        text: msg ?? CANNOT_SAVE_BANK_ACCOUNT,
        type: AlertType.ERROR,
      });
    }
  }

  useEffect(() => {
    fetchBanks();
    setBankAccountValues();
  }, []);

  return (
    <View style={styles.bankAccountForm}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.inputs}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <AppTextInput
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Conta corrente do Bradesco"
              label="Nome da conta"
              errorMessage={errors.name?.message}
            />
          )}
        />
        <Controller
          name="bankId"
          control={control}
          render={({ field }) => (
            <AppSelect
              data={banksOptions}
              label="Banco"
              onSelect={field.onChange}
              selected={field.value?.toString() ?? undefined}
            />
          )}
        />
        <Controller
          name="balance"
          control={control}
          defaultValue={"R$ 0"}
          render={({ field }) => (
            <AppTextInput
              label="Saldo"
              value={field.value}
              onChangeText={changeBalance}
              keyboardType="numeric"
              errorMessage={errors.balance?.message}
            />
          )}
        />
      </View>
      <AppButton primary onPress={handleSubmit(onSubmit)} text="Salvar" />
    </View>
  );
}
