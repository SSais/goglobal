import 'react-native-url-polyfill/auto';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { View, Text, StyleSheet } from 'react-native';
import { Session } from '@supabase/supabase-js';
import { Link } from 'expo-router';
import { useRouter } from 'expo-router';

//components
import Welcome from '@/components/Auth/Header';

export default function App() {
  const router = useRouter();
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
    !session ? (
<View style={styles.container}>
    <Welcome />
      <View style={styles.signUp}>
        <Text>
          Don't have an account?{' '}
          <Text style={styles.boldText}>
            <Link href="/signup">Sign up</Link>
          </Text>
        </Text>
      </View>
      </View>  
    ) : (
      router.push('/dashboard')
    )
    
  ); 
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
  },
  signUp: {
    padding: 20,
  },
  boldText: {
    fontWeight: 'bold',
  }
});
