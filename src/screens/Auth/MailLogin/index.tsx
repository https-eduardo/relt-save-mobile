import { Text, View } from 'react-native';
import { styles } from './styles';
import AppTextInput from '../../../components/AppTextInput';
import AppButton from '../../../components/AppButton';

export default function MailLoginScreen() {
  async function handleLogin() {

  }

  return (
    <View style={styles.container}>
      <View style={styles.texts}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Entre em sua conta para acessar os recursos da nossa plataforma.</Text>
      </View>
      <View style={styles.inputs}>
        <AppTextInput label='Email' placeholder='john.doe@gmail.com' validatorType='email' />
        <AppTextInput label='Senha' placeholder='senha123' validatorType='password' />
      </View>
      <AppButton onPress={handleLogin} primary text='Entrar' />
    </View>
  )
}