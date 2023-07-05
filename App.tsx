import {
  NavigationContainer,
  DefaultTheme,
  Theme,
} from "@react-navigation/native";
import * as Font from "expo-font";
import Routes from "./routes";
import { AuthProvider } from "./contexts/auth";

// TODO: Find a better way, instead of repeating type declaration
interface AppCustomTheme extends Theme {
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
    [key: string]: string;
  };
}

export default function App() {
  const [loaded] = Font.useFonts({
    InterRegular: require("./assets/fonts/Inter/Inter-Regular.ttf"),
    InterMedium: require("./assets/fonts/Inter/Inter-Medium.ttf"),
    InterSemiBold: require("./assets/fonts/Inter/Inter-SemiBold.ttf"),
    InterBold: require("./assets/fonts/Inter/Inter-Bold.ttf"),
    InterBlack: require("./assets/fonts/Inter/Inter-Black.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer theme={AppTheme}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}

const AppTheme: AppCustomTheme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: "#EFEFEF",
    secondaryBackground: "#e6e6e6",
    redBackground: '#DB2828',
    greenBackground: '#4BD429',
    primary: "#373EEA",
    text: "#686868",
    secondaryText: "#121212",
    red: "#DE3E3E",
    yellow: "#F2A000",
    green: "#37AC00",
  },
};
