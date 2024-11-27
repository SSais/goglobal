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
        <Text style={styles.link} onPress={handleExistingUser}>I already have an account</Text>
        <Text style={styles.separator}>/</Text>
        <Text style={styles.link} onPress={handleNewUser}>I'm new</Text>
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
    width: '100%',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
  },
  userSelect: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  link: {
    fontSize: 16,
    color: '#007BFF',
    textDecorationLine: 'underline',
    marginHorizontal: 10,
  },
  separator: {
    fontSize: 16,
    color: '#666',
  },
});

