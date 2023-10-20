import {
  createContext,
  useState,
  PropsWithChildren,
  useContext,
  useEffect,
} from "react";
import { TransactionsFilter } from "../shared/interfaces/transaction.interface";
import GlobalContext from "./global";
import { DateUtils } from "../utils/date";

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
    maxDate: DateUtils.getMonthMaxDate(period),
  };
  const [filters, setFilters] = useState<TransactionsFilter>(initialFilter);
  const [tempFilters, setTempFilters] =
    useState<TransactionsFilter>(initialFilter);

  function updateFilters(transactionsFilter: TransactionsFilter) {
    setTempFilters({ ...tempFilters, ...transactionsFilter });
  }

  function applyFilters() {
    setFilters(tempFilters);
  }

  function clearFilters() {
    const initialFilter = {
      minDate: period,
      maxDate: DateUtils.getMonthMaxDate(period),
    };
    setFilters(initialFilter);
    setTempFilters(initialFilter);
  }

  useEffect(() => {
    const dateFilter = {
      minDate: period,
      maxDate: DateUtils.getMonthMaxDate(period),
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
