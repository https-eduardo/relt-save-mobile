import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import Routes from "./routes";
import { AuthProvider } from "./contexts/auth";
import { AppTheme } from "./theme";

export default function App() {
  const [loaded] = Font.useFonts({
    InterRegular: require("../assets/fonts/Inter/Inter-Regular.ttf"),
    InterMedium: require("../assets/fonts/Inter/Inter-Medium.ttf"),
    InterSemiBold: require("../assets/fonts/Inter/Inter-SemiBold.ttf"),
    InterBold: require("../assets/fonts/Inter/Inter-Bold.ttf"),
    InterBlack: require("../assets/fonts/Inter/Inter-Black.ttf"),
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
