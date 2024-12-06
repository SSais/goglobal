import { View, StyleSheet } from 'react-native'
import { Text } from '@rneui/themed'
import Ionicons from '@expo/vector-icons/Ionicons';

import SubHeader from './subHeader';

export default function Header({prof}: {prof: any}) {

  return (
    <View>
      <View style={styles.container}>
        <Ionicons name="earth-outline" size={30} color="#2037AA" />
        <Text style={styles.title}>Let's Go Global!</Text>
        <Ionicons name="person-circle-outline" size={30} color="#2037AA" />
        <View style={styles.bottomShadow} />   
      </View> 
      <SubHeader />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    flex: 1,
    color: '#2037AA',
  },
  bottomShadow: {
    height: 5,
    backgroundColor: 'black',
    marginTop: 5,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
})
