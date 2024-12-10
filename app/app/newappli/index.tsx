import { useState, useEffect } from 'react';
import { Alert, View, Text } from 'react-native';
import { supabase } from '../../lib/supabase';
import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

import Header from "@/components/MainHeader/Header";
import Questions from '@/components/Questions/Questions';

export default function Newappli() {
  interface Profile {
    id: string;
    first_name: string;
    last_name: string;
    phone: string;
    dob: string;
  }

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [questionVisible, setQuestionVisible] = useState<boolean>(true);

  const handleHideQuestions = () => {
    setQuestionVisible(false);
  }

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
      <Header prof={profiles} />
      {questionVisible && <Questions onSubmit={handleHideQuestions} />}
    </View>
  );
}
