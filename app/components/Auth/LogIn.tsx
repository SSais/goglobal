import React, { useState } from 'react'
import { Alert, StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import { supabase } from '../../lib/supabase'
import { Button, Input } from '@rneui/themed'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    console.log('success')

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.formContainer}>
        <View style={styles.inputWrapper}>
          <Input
            label="Email"
            leftIcon={{ type: 'font-awesome', name: 'envelope' }}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="Go@Global.com"
            autoCapitalize={'none'}
            containerStyle={styles.input}
            inputContainerStyle={styles.inputField}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Input
            label="Password"
            leftIcon={{ type: 'font-awesome', name: 'lock' }}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize={'none'}
            containerStyle={styles.input}
            inputContainerStyle={styles.inputField}
          />
        </View>

        <View>
          <Button
            title="Sign in"
            disabled={loading}
            onPress={() => signInWithEmail()}
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    width: '100%',
    padding: 20,
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputWrapper: {
    marginBottom: 20,
    width: '100%',
  },
  input: {
    width: '100%',
  },
  inputField: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    paddingVertical: 12,
    width: '100%',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
})
