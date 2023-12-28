import { createContext, useState, PropsWithChildren } from "react";

interface GlobalContextData {
  period: Date;
  updatePeriod: (period: string) => void;
}

const GlobalContext = createContext<GlobalContextData>({} as GlobalContextData);

export const GlobalProvider = ({ children }: PropsWithChildren) => {
  const initialDate = new Date();
  initialDate.setUTCDate(1);
  initialDate.setUTCHours(0, 0, 0);
  const [period, setPeriod] = useState<Date>(initialDate);

  function updatePeriod(period: string) {
    const [month, year] = period.split("/");
    const date = new Date(+year, +month - 1, 1);
    date.setUTCHours(0, 0, 0);
    setPeriod(date);
  }

  return (
    <GlobalContext.Provider value={{ period, updatePeriod }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
