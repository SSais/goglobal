import { supabase } from '../../lib/supabase'
import { Alert, StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import { Text, Button } from '@rneui/themed'

export default function Dashboard() {
  return (
    <View>
      <Text>Dashboard</Text>
      <Button title="Sign out" onPress={() => supabase.auth.signOut()} />
    </View>
  )
}