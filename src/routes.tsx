import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GoogleLoginScreen from "./screens/Auth/GoogleLogin";
import ProfileScreen from "./screens/Auth/Profile";
import HomeScreen from "./screens/Summary";
import TransactionsScreen from "./screens/Transactions";
import { useContext } from "react";
import AuthContext from "./contexts/auth";
import MailLoginScreen from "./screens/Auth/MailLogin";
import RegisterScreen from "./screens/Auth/Register";
import ForgotPasswordScreen from "./screens/Auth/ForgotPassword";
import RecoveryCodeScreen from "./screens/Auth/RecoveryCode";
import { RecoverPasswordRouteProps, RecoveryCodeRouteProps } from '../@types/navigation';
import RecoverPasswordScreen from './screens/Auth/RecoverPassword';

type RootStackParamList = {
  Home: undefined;
  Transactions: undefined;
  Profile: { token: string | null };
};

type AuthStackParamList = {
  GoogleLogin: undefined;
  MailLogin: undefined;
  Profile: { token: string | null };
  RecoveryCode: RecoveryCodeRouteProps;
  RecoverPassword: RecoverPasswordRouteProps;
  Home: undefined;
  Transactions: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthRoutes: React.FC = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="GoogleLogin" component={GoogleLoginScreen} />
    <AuthStack.Screen name="MailLogin" component={MailLoginScreen} />
    <AuthStack.Screen name="Register" component={RegisterScreen} />
    <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    <AuthStack.Screen name="RecoveryCode" component={RecoveryCodeScreen} />
    <AuthStack.Screen name="RecoverPassword" component={RecoverPasswordScreen} />
    <AuthStack.Screen name="Profile" component={ProfileScreen} />
  </AuthStack.Navigator>
);

const AppRoutes: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Transactions" component={TransactionsScreen} />
  </Stack.Navigator>
);

const Routes: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
