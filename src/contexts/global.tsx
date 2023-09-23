import { createContext, useState, PropsWithChildren } from "react";

interface GlobalContextData {
  month: number | null;
  updateMonth: (month: number | null) => void;
}

const GlobalContext = createContext<GlobalContextData>({} as GlobalContextData);

export const GlobalProvider = ({ children }: PropsWithChildren) => {
  const [month, setMonth] = useState<number | null>(null);

  function updateMonth(month: number | null) {
    setMonth(month);
  }

  return (
    <GlobalContext.Provider value={{ month, updateMonth }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
