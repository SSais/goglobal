import { useState, useEffect } from 'react';
import { Alert, View, Text } from 'react-native';
import { supabase } from '../../lib/supabase';
import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

import Header from "@/components/MainHeader/Header";
import Questions from '@/components/Questions/Questions';
import Eligibility from '@/components/Questions/Eligibility';

  interface Profile {
    id: string;
    first_name: string;
    last_name: string;
    phone: string;
    dob: string;
  }

  interface Eligibility {
    generalinfo: any;
    header: string;
    questions: string[];
  }

export default function Newappli() {
  //State to store profiles
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [error, setError] = useState<string | null>(null);

  //State to hide/show questions component
  const [questionVisible, setQuestionVisible] = useState<boolean>(true);
  const [eligibility, setEligibility] = useState<boolean>(false);

  //State to store eligibility data
  const [eligibilityData, setEligibilityData] = useState<string | null>('');

  const handleHideQuestions = () => {
    setQuestionVisible(false);
    setEligibility(true);
    fetchEligibility();
  }

  //Fetch profiles from supabase on component mount
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

  //If Screening questions pass, show fetch eligibility from api
  //Will need to adapt this later as we add more visa types
  const fetchEligibility = async () => {
    try {
      const response = await fetch('https://go-global-backend.vercel.app/britishspainnomad', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Response Status:', response.status);
      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status code: ${response.status}`);
      } 
      const data = await response.json();
      console.log('Data:', data);
      setEligibilityData(data);
    } catch (error) {
      console.error('An unknown error occurred');
    }
  };

  return (
    <View>
      <Header prof={profiles} />
      {questionVisible && <Questions onSubmit={handleHideQuestions} />}
      {eligibility && eligibilityData && <Eligibility data={eligibilityData} />}
    </View>
  );
}
