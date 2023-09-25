import {
  createContext,
  useState,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { TransactionsFilter } from "../shared/interfaces/transaction.interface";
import GlobalContext from "./global";

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
  const { period } = useContext(GlobalContext);
  const initialFilter = {
    minDate: period,
    maxDate: getMaxDate(period),
  };
  const [filters, setFilters] = useState<TransactionsFilter>(initialFilter);
  const [tempFilters, setTempFilters] =
    useState<TransactionsFilter>(initialFilter);

  function getMaxDate(period: Date) {
    const month = period.getUTCMonth() + 1;
    const year = period.getUTCFullYear();
    const date = new Date(year, month, 0);
    date.setUTCHours(23, 59, 59);
    return date;
  }

  function updateFilters(transactionsFilter: TransactionsFilter) {
    setTempFilters({ ...tempFilters, ...transactionsFilter });
  }

  function applyFilters() {
    setFilters(tempFilters);
  }

  function clearFilters() {
    const initialFilter = {
      minDate: period,
      maxDate: getMaxDate(period),
    };
    setFilters(initialFilter);
    setTempFilters(initialFilter);
  }

  useEffect(() => {
    const dateFilter = {
      minDate: period,
      maxDate: getMaxDate(period),
    };
    setFilters({ ...filters, ...dateFilter });
  }, [period]);

  return (
    <TransactionsContext.Provider
      value={{ filters, applyFilters, updateFilters, clearFilters }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export default TransactionsContext;
