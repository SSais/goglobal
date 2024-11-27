import 'react-native-url-polyfill/auto';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { View, Text, StyleSheet } from 'react-native';
import { Session } from '@supabase/supabase-js';
import { Link } from 'expo-router';

import Welcome from '@/components/Auth/Welcome';

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* {session && session.user && <Text>{session.user.id}</Text>} */}
      <Welcome />
      <View>
        <Text>Don't have an account?</Text>
        <Link href="/signup/signup">Sign up</Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
  },
});
