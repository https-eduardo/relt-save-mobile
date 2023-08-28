import { Text, View } from 'react-native';
import Header from '../../Header';
import AppButton from '../../AppButton';
import Ionicon from '@expo/vector-icons/Ionicons';
import Avatar from '../../Avatar';
import { styles } from './styles';
import { DateUtils } from '../../../utils/date';
import { useContext, useMemo } from 'react';
import AuthContext from '../../../contexts/auth';

export default function SettingsHeader() {
  const { user } = useContext(AuthContext);

  const createdAt = useMemo(() => {
    if (!user || !user.createdAt) return;
    return DateUtils.formatDate(user.createdAt);
  }, [user?.createdAt])

  return (
    <Header style={styles.headerContainer}>
      <View>
        <Text style={styles.fullname}>{user?.name}</Text>
        <Text style={styles.createdAt}>Entrou em {createdAt}</Text>
        <AppButton primary onPress={() => { }} style={styles.exportButton}>
          <Ionicon name="cloud-download-outline" style={styles.exportIcon} />
          <Text style={styles.exportText}>Exportar dados</Text>
        </AppButton>
      </View>
      <Avatar style={styles.profile} url={user?.profileUrl} size='big' />
    </Header>
  )
}