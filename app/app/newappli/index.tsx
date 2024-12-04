import { useState, useEffect } from 'react';
import { Alert, View, Text } from 'react-native';
import { supabase } from '../../lib/supabase';
import { Link } from 'expo-router';

import Header from "@/components/DashBoard/Header";
import Questions from '@/components/Questions/Questions';

export default function Newappli() {
  interface Profile {
    id: string;
    first_name: string;
    last_name: string;
    phone: string;
    dob: string;
  }

  // interface questionData {
  //   question: string;
  //   answerType: string;
  //   answerOptions: string[];
  // }

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
    //console.log(profiles);
  }, []);

  if (profiles.length === 0) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Header prof={profiles} />
      <Text>Open Application</Text>
      <Questions 
        // question={'What passport/s do you hold?'} 
        // answerOptions={['Australian', 'British', 'Canadian', 'American', 'Other']} 
        // answerType={'dropdown'}
      />
    </View>
  );
}