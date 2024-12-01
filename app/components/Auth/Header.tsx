import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; 
import Ionicons from '@expo/vector-icons/Ionicons';

import LogIn from './LogIn';

export default function Welcome() {
  return (
    <View style={styles.mainContainer}>
      <LinearGradient
        colors={['#4A90E2', '#F5F5F5']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      >
        <View style={styles.container}>
        <Ionicons name="earth-outline" size={70} color="black" />
          <Text style={styles.title}>Welcome to GoGlobal</Text>
          <Text style={styles.subtitle}>Navigate Borders, Simplify Life.</Text>
        </View>
      </LinearGradient>
      <LogIn />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f9f9f9',
  },
  container: {
    paddingTop: 150,
    alignItems: 'center',
    width: '100%',
    paddingBottom: 150,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 0,
  },
  gradientBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 0,
  },
  title: {
    fontSize: 36,
    marginTop: 20,
    fontWeight: 'bold',
    color: '#333333', // Updated text color
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 20,
    marginTop: 20,
    color: '#666666', // Updated text color
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});