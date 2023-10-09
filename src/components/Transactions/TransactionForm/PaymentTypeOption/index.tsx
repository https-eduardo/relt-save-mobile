import { Control, Controller, useWatch } from "react-hook-form";
import BankAccountSelector from "../BankAccountSelector";
import { TransactionFormData } from "../../../../shared/interfaces";
import CardSelector from "../CardSelector";

interface PaymentTypeOptionProps {
  control: Control<TransactionFormData>;
}

export default function PaymentTypeOption({ control }: PaymentTypeOptionProps) {
  const form = useWatch({
    control,
  });

  if (form.paymentType === "BALANCE")
    return (
      <Controller
        control={control}
        name="bankAccountId"
        render={({ field }) => (
          <BankAccountSelector
            onSelect={(text) => field.onChange(Number(text))}
            selected={field.value?.toString()}
          />
        )}
      />
    );
  else if (form.paymentType === "CARD")
    return (
      <Controller
        control={control}
        name="cardId"
        render={({ field }) => (
          <CardSelector
            onSelect={(text) => field.onChange(Number(text))}
            selected={field.value?.toString()}
          />
        )}
      />
    );
  return null;
}
