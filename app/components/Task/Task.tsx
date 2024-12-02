import { View, StyleSheet } from 'react-native'
import { Text } from '@rneui/themed'
import { Link } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function Task() {

  return (
  <View style={styles.container}>
      <Text>Open Application</Text>
        <Link href='/newappli'>
            <Ionicons name="add-outline" size={40} color="black" />
        </Link>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,}  
})