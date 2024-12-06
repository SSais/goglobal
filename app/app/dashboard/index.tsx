import { useState, useEffect } from 'react'
import { Alert, View, Text } from 'react-native'
import { supabase } from '../../lib/supabase'

import Signout from '@/components/Signout/Signout';
import Header from "@/components/MainHeader/Header";

export default function Dashboard() {
  
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
    //a reminder for what is nbeing fetched with profiles
    //console.log(profiles);
  }, []);

  if (profiles.length === 0) {
    return <Text>Loading...</Text>;
  }

return (
  <View>
    <Header prof={profiles} />
    <Text>Dashboard</Text>
    <Signout />
  </View>
)}