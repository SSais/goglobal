import { View, StyleSheet } from 'react-native'
import { Text } from '@rneui/themed'
import Ionicons from '@expo/vector-icons/Ionicons';


export default function Header({prof}: {prof: any}) {

  return (
  <View style={styles.container}>
    <View>
      <Text>Let's Go Global!</Text>
      <Text>{prof[0].first_name} {prof[0].last_name}</Text>
    </View>
    {/* a link needs to be added to the profile icon*/}
    <Ionicons name="person-circle-outline" size={50} color="black" />
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'white',
  }  
})