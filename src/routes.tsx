import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import GoogleLoginScreen from "./screens/Auth/GoogleLogin";
import ProfileScreen from "./screens/Auth/Profile";
import HomeScreen from "./screens/Summary";
import TransactionsScreen from "./screens/Transactions";
import React, { useContext } from "react";
import UserContext from "./contexts/auth";
import MailLoginScreen from "./screens/Auth/MailLogin";
import RegisterScreen from "./screens/Auth/Register";
import ForgotPasswordScreen from "./screens/Auth/ForgotPassword";
import RecoveryCodeScreen from "./screens/Auth/RecoveryCode/RecoveryCodeScreen";
import {
  RecoverPasswordRouteProps,
  RecoveryCodeRouteProps,
} from "../@types/navigation";
import RecoverPasswordScreen from "./screens/Auth/RecoverPassword";
import Ionicon from "@expo/vector-icons/Ionicons";
import { COLORS } from "./theme";
import SettingsScreen from "./screens/Settings";
import TransactionsRegister from "./screens/TransactionsRegister";
import { NavigationContainer } from "@react-navigation/native";

export type RootStackParamList = {
  Home: undefined;
  Transactions: undefined;
  Profile: undefined;
  Settings: undefined;
  TransactionsIncomeRegister: undefined;
  TabRoutes: undefined;
};

export type AuthStackParamList = {
  GoogleLogin: undefined;
  MailLogin: undefined;
  Profile: undefined;
  RecoveryCode: RecoveryCodeRouteProps;
  RecoverPassword: RecoverPasswordRouteProps;
  Home: undefined;
  Transactions: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();
const Stack = createBottomTabNavigator<RootStackParamList>();

const AuthRoutes: React.FC = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="GoogleLogin" component={GoogleLoginScreen} />
    <AuthStack.Screen name="MailLogin" component={MailLoginScreen} />
    <AuthStack.Screen name="Register" component={RegisterScreen} />
    <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    <AuthStack.Screen name="RecoveryCode" component={RecoveryCodeScreen} />
    <AuthStack.Screen
      name="RecoverPassword"
      component={RecoverPasswordScreen}
    />
    <AuthStack.Screen name="Profile" component={ProfileScreen} />
  </AuthStack.Navigator>
);

const TabRoutes: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      tabBarHideOnKeyboard: true,
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: COLORS.text,
      headerTitleStyle: {
        fontFamily: "InterRegular",
      },
    }}
  >
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: "Resumo",
        tabBarIcon: ({ size, color }) => (
          <Ionicon name="home-outline" size={size} color={color} />
        ),
      }}
    />
    <Stack.Screen
      name="Transactions"
      component={TransactionsScreen}
      options={{
        title: "Movimentações",
        tabBarIcon: ({ size, color }) => (
          <Ionicon name="shuffle-outline" size={size} color={color} />
        ),
      }}
    />
    <Stack.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        title: "Mais",
        tabBarIcon: ({ size, color }) => (
          <Ionicon
            name="ellipsis-horizontal-outline"
            size={size}
            color={color}
          />
        ),
      }}
    />
  </Stack.Navigator>
);

const AppRoutes: React.FC = () => (
  <RootStack.Navigator screenOptions={{ headerShown: false }}>
    <RootStack.Screen name="TabRoutes" component={TabRoutes} />
    <RootStack.Screen
      name="TransactionsIncomeRegister"
      component={TransactionsRegister}
    />
  </RootStack.Navigator>
);

const Routes: React.FC = () => {
  const { isAuthenticated } = useContext(UserContext);
  return isAuthenticated ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
