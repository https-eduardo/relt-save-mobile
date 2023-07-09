import { DefaultTheme } from "@react-navigation/native";
import { AppCustomTheme } from "../@types/theme";

export const COLORS = {
  ...DefaultTheme.colors,
  bgScreen: "#EFEFEF",
  bgInput: "#E6E6E6",
  bgButton: "#DEDEDE",
  bgRed: "#DB2828",
  bgGreen: "#4BD429",
  primary: "#373EEA",
  text: "#686868",
  textBlack: "#121212",
  textWhite: "#FFFFFF",
  red: "#DE3E3E",
  yellow: "#F2A000",
  green: "#37AC00",
};

export const AppTheme: AppCustomTheme = {
  dark: false,
  colors: COLORS,
};
