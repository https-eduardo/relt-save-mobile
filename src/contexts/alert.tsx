import { createContext, useState, PropsWithChildren, useEffect } from "react";
import AppAlert from "../components/AppAlert";
import { Alert } from "../shared/interfaces/alert.interface";
import { BackHandler } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface AlertContextData {
  update: (alert: Alert | null) => void;
}

const AlertContext = createContext<AlertContextData>({} as AlertContextData);

export const AlertProvider = ({ children }: PropsWithChildren) => {
  const [visible, setVisible] = useState(false);
  const [alert, setAlert] = useState<Alert | null>(null);
  const navigation = useNavigation();

  function update(alert: Alert | null) {
    setAlert(alert);
    setVisible(true);
  }

  useEffect(() => {
    navigation.addListener("state", () => {
      update(null);
    });
  }, []);

  function onDismiss() {
    setVisible(false);
  }

  return (
    <AlertContext.Provider value={{ update }}>
      <AppAlert alert={alert} visible={visible} onDismiss={onDismiss} />
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
