// TODO: Find a better way, instead of repeating type declaration
export type AppCustomTheme = {
  dark: boolean;
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

declare module "@react-navigation/native" {
  export function useTheme(): AppCustomTheme;
}