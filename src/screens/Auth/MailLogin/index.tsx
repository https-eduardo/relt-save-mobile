import { Text, View } from "react-native";
import { styles } from "./styles";
import AppTextInput from "../../../components/AppTextInput";
import AppButton from "../../../components/AppButton";
import { useNavigation } from "@react-navigation/native";

export default function MailLoginScreen() {
  const { navigate } = useNavigation();

  async function handleLogin() {}
  function navigateToForgotPassword() {}

  function navigateToRegister() {
    navigate("Register");
  }

  return (
    <View style={styles.container}>
      <View style={styles.texts}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>
          Entre em sua conta para acessar os recursos da nossa plataforma.
        </Text>
      </View>
      <View style={styles.inputs}>
        <AppTextInput
          icon="person-outline"
          label="Email"
          placeholder="john.doe@gmail.com"
          validatorType="email"
        />
        <AppTextInput
          label="Senha"
          icon="lock-closed-outline"
          placeholder="senha123"
          validatorType="password"
        />
      </View>
      <View style={styles.forgotPasswordContainer}>
        <Text style={styles.forgotPassword} onPress={navigateToForgotPassword}>
          Esqueceu sua senha?
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <AppButton onPress={handleLogin} primary text="Entrar" />
        <Text style={styles.register}>
          Ainda não tem conta?
          <Text style={styles.registerLink} onPress={navigateToRegister}>
            {" "}
            Se registre aqui
          </Text>
        </Text>
      </View>
    </View>
  );
}
