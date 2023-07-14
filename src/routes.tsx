import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GoogleLoginScreen from "./screens/Auth/GoogleLogin";
import ProfileScreen from "./screens/Auth/Profile";
import HomeScreen from "./screens/Summary";
import SpendingsScreen from "./screens/Transactions";
import { useContext } from "react";
import AuthContext from "./contexts/auth";
import MailLoginScreen from './screens/Auth/MailLogin';

type RootStackParamList = {
  Home: undefined;
  Spendings: undefined;
  Profile: { token: string | null };
};

type AuthStackParamList = {
  GoogleLogin: undefined;
  MailLogin: undefined;
  Profile: { token: string | null };
  Home: undefined;
  Spendings: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthRoutes: React.FC = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="GoogleLogin" component={GoogleLoginScreen} />
    <AuthStack.Screen name="MailLogin" component={MailLoginScreen} />
    <AuthStack.Screen name="Profile" component={ProfileScreen} />
  </AuthStack.Navigator>
);

const AppRoutes: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Spendings" component={SpendingsScreen} />
  </Stack.Navigator>
);

const Routes: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
