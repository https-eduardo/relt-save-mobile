import { PropsWithChildren, useContext, useEffect } from "react";
import { StyleProp, Text, TextStyle, View, ViewStyle } from "react-native";
import ReturnIcon from "../../components/ReturnIcon";
import { styles } from "./styles";

interface AuthLayoutComponentProps extends PropsWithChildren {
  style?: StyleProp<ViewStyle | TextStyle>;
}

interface AuthLayoutProps extends PropsWithChildren {
  returnable?: boolean;
  style?: StyleProp<ViewStyle>;
}

function AuthLayout(props: AuthLayoutProps) {
  return (
    <View style={!!props.style ? props.style : styles.container}>
      {props.returnable && <ReturnIcon />}
      {props.children}
    </View>
  );
}

function AuthLayoutContent({ style, children }: AuthLayoutComponentProps) {
  return <View style={style ? style : styles.content}>{children}</View>;
}

function AuthLayoutTexts({ style, children }: AuthLayoutComponentProps) {
  return <View style={style ? style : styles.texts}>{children}</View>;
}

function AuthLayoutTitle({ style, children }: AuthLayoutComponentProps) {
  return <Text style={style ? style : styles.title}>{children}</Text>;
}

function AuthLayoutSubtitle({ style, children }: AuthLayoutComponentProps) {
  return <Text style={style ? style : styles.subtitle}>{children}</Text>;
}

function AuthLayoutInputs({ style, children }: AuthLayoutComponentProps) {
  return <View style={style ? style : styles.inputs}>{children}</View>;
}

function AuthLayoutButtonContainer({
  style,
  children,
}: AuthLayoutComponentProps) {
  return <View style={style ? style : styles.buttonContainer}>{children}</View>;
}

function AuthLayoutForgotPasswordContainer({
  style,
  children,
}: AuthLayoutComponentProps) {
  return (
    <View style={style ? style : styles.forgotPasswordContainer}>
      {children}
    </View>
  );
}

function AuthLayoutAvatarsContainer({
  style,
  children,
}: AuthLayoutComponentProps) {
  return <View style={styles.avatarsContainer}>{children}</View>;
}

AuthLayout.Content = AuthLayoutContent;
AuthLayout.Texts = AuthLayoutTexts;
AuthLayout.Title = AuthLayoutTitle;
AuthLayout.Subtitle = AuthLayoutSubtitle;
AuthLayout.Inputs = AuthLayoutInputs;
AuthLayout.ButtonContainer = AuthLayoutButtonContainer;
AuthLayout.ForgotPasswordContainer = AuthLayoutForgotPasswordContainer;
AuthLayout.AvatarsContainer = AuthLayoutAvatarsContainer;

export default AuthLayout;
