import { View } from 'react-native'
import { Text } from '@rneui/themed'

export default function Header({prof}: {prof: any}) {

  return (
    <View>
      <Text>Welcome Back, {prof[0].first_name} </Text>
    </View>
  )
}
