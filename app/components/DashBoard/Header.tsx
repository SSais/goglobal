import { supabase } from '../../lib/supabase'
import { Alert, StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import { Text, Button } from '@rneui/themed'
import { useState, useEffect } from 'react'

export default function Header() {

  interface Profile {
    id: string;
    first_name: string;
    last_name: string;
    phone: string;
    dob: string;
  }

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      const { data, error } = await supabase.from('profiles').select('*');
      if (error) {
        setError(error.message);
        Alert.alert('Error', error.message);
      } else {
        setProfiles(data || []);
      }
    };

    fetchProfiles();
  }, []);

  if (profiles.length === 0) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Text>Welcome Back, {profiles[0].first_name}</Text>
      <Button title="Sign out" onPress={() => supabase.auth.signOut()} />
    </View>
  )
}
