import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useState } from 'react';

import Auth from './SignUp';
import LogIn from './LogIn';

export default function Welcome() {

  const [newUser, setNewUser] = useState(false);
  const [existingUser, setExistingUser] = useState(false);

  //Update state for new user
  const handleNewUser = () => {
    setNewUser(true);
    setExistingUser(false);
    console.log('New User');
  };

  //Update state for existing user
  const handleExistingUser = () => {
    setNewUser(false);
    setExistingUser(true);
    console.log('Existing User');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to GoGlobal</Text>
      <Text style={styles.subtitle}>Navigate Borders, Simplify Life.</Text>
      <View style={styles.userSelect}>
        <Text onPress={handleExistingUser}>I already have an account</Text>
        <Text>/</Text>
        <Text onPress={handleNewUser}>I'm new</Text>
      </View>
      {newUser && <Auth/>}
      {existingUser && <LogIn/>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    alignItems: 'center',
    flex: 1,
    width: '100%', // Added to take up full width
  },
  title: (
      {
          fontSize: 32,
          fontWeight: 'bold'
      }
  ),
  subtitle: (
      {
          padding : 20,
          fontSize: 18,
          color: 'gray'
      }
  ),
  userSelect: (
      {
          display: 'flex',
          flexDirection: 'row',
          gap: 20,
          padding : 40,
          fontSize: 0,
          color: 'gray'
      }
  )
})

