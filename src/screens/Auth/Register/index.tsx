import { Text, View } from "react-native";
import { styles } from "./styles";
import AppTextInput from "../../../components/AppTextInput";
import AppButton from "../../../components/AppButton";
import IoniIcon from "@expo/vector-icons/Ionicons";
import { COLORS } from "../../../theme";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen() {
  const navigation = useNavigation();

  async function handleRegister() {}

  function navigateToLogin() {
    navigation.navigate("MailLogin");
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.returnIconContainer}>
        <IoniIcon
          name="arrow-back"
          size={24}
          color={COLORS.text}
          onPress={navigation.goBack}
        />
      </SafeAreaView>
      <View style={styles.content}>
        <View style={styles.texts}>
          <Text style={styles.title}>Cadastro</Text>
          <Text style={styles.subtitle}>
            Crie uma conta para acessar todos os recursos de nossa plataforma.
          </Text>
        </View>
        <View style={styles.inputs}>
          <AppTextInput
            icon="person-outline"
            label="Nome de usuário"
            placeholder="John Doe"
            validatorType="user"
          />
          <AppTextInput
            icon="mail-outline"
            label="Email"
            placeholder="john.doe@gmail.com"
            validatorType="email"
          />
          <AppTextInput
            icon="lock-closed-outline"
            label="Senha"
            placeholder="senha123"
            validatorType="password"
          />
          <AppTextInput
            icon="lock-closed-outline"
            label="Confirme sua senha"
            placeholder="senha123"
            validatorType="password"
          />
        </View>
        <AppButton onPress={handleRegister} primary text="Avançar">
          <IoniIcon name="arrow-forward" size={18} color={COLORS.textWhite} />
        </AppButton>
        <Text style={styles.login}>
          Já tem conta?{" "}
          <Text style={styles.loginLink} onPress={navigateToLogin}>
            Faça seu login aqui.
          </Text>
        </Text>
      </View>
    </View>
  );
}
