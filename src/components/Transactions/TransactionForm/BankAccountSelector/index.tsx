import { BankAccountsService } from "../../../../services/bank-accounts";
import { BadgeSelect } from "../../../../shared/interfaces";
import AppSelect from "../../../AppSelect";
import { useCallback, useEffect, useState } from "react";

interface BankAccountSelectorProps {
  selected?: string;
  onSelect: (item: string) => void;
}

export default function BankAccountSelector(props: BankAccountSelectorProps) {
  const [bankAccounts, setBankAccounts] = useState<BadgeSelect[]>([]);
  const [selected, setSelected] = useState(props.selected);

  const fetchBankAccounts = useCallback(async () => {
    try {
      const bankAccounts = await BankAccountsService.getBankAccounts();
      const bankAccountsOptions = bankAccounts.map((bankAccount) => ({
        label: bankAccount.name,
        value: bankAccount.id.toString(),
      }));
      setBankAccounts(bankAccountsOptions);
      if (!props.selected) setSelected(bankAccountsOptions[0]?.value);
    } catch {}
  }, []);

  useEffect(() => {
    fetchBankAccounts();
  }, [fetchBankAccounts]);

  return (
    <AppSelect
      label="Conta Bancária"
      data={bankAccounts}
      selected={selected}
      onSelect={props.onSelect}
    ></AppSelect>
  );
}
