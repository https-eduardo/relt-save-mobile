import { Text, View } from 'react-native';
import SettingsHeader from '../../components/Settings/SettingsHeader';
import { styles } from './styles';
import AppButton from '../../components/AppButton';
import Ionicon from '@expo/vector-icons/Ionicons';
import SettingsButton from '../../components/Settings/SettingsButton';

export default function SettingsScreen() {
  function changeUserData() { }
  function manageCategories() { }
  function reportProblem() { }
  function deleteUserData() { }

  return (
    <View style={styles.container}>
      <SettingsHeader />
      <View style={styles.settingsContainer}>
        <Text style={styles.title}>Configurações</Text>
        <View style={styles.buttonsContainer}>
          <SettingsButton icon='person-outline' onPress={changeUserData} text='Alterar informações do usuário' />
          <SettingsButton icon='bookmarks-outline' onPress={manageCategories} text='Gerenciar categorias de movimentações' />
          <SettingsButton
            icon='flag-outline'
            onPress={reportProblem}
            text='Reportar um problema'
            style={styles.reportButton}
          />
          <SettingsButton
            icon='trash-outline'
            onPress={deleteUserData}
            text='Deletar seus dados pessoais'
            style={styles.deleteButton}
          />
        </View>
      </View>
    </View>
  )
}