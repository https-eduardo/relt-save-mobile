import { createContext, useState, PropsWithChildren } from "react";
import { TransactionsFilter } from "../shared/interfaces/transaction.interface";

interface TransactionsContextData {
  filters: TransactionsFilter;
  updateFilters: (filters: TransactionsFilter) => void;
  applyFilters: () => void;
  clearFilters: () => void;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export const TransactionsProvider = ({ children }: PropsWithChildren) => {
  const [filters, setFilters] = useState<TransactionsFilter>({});
  const [tempFilters, setTempFilters] = useState<TransactionsFilter>({});

  function updateFilters(transactionsFilter: TransactionsFilter) {
    setTempFilters({ ...tempFilters, ...transactionsFilter });
  }

  function applyFilters() {
    setFilters(tempFilters);
  }

  function clearFilters() {
    setFilters({});
    setTempFilters({});
  }

  return (
    <TransactionsContext.Provider
      value={{ filters, applyFilters, updateFilters, clearFilters }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export default TransactionsContext;
