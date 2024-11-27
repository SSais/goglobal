import React, { useState } from 'react'
import { Alert, StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import { supabase } from '../../lib/supabase'
import { Button, Input } from '@rneui/themed'

export default function SignUp() {
  const [email, setEmail] = useState<string>('')
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true)

  const [password, setPassword] = useState('')
  const [isValidPassword, setIsValidPassword] = useState<boolean>(true)
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')

  const [phone, setPhone] = useState<string>('')
  const [isValidPhone, setIsValidPhone] = useState<boolean>(true)

  const [dob, setDob] = useState<string>('')

  const [loading, setLoading] = useState(false)

  // Check if email is valid
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const handleEmailChange = (text: string): void => {
    setEmail(text)
    setIsValidEmail(emailRegex.test(text)) // Validate email and update state
  }

  // Check if password is valid
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/

  const handlePasswordChange = (text: string): void => {
    setPassword(text)
    setIsValidPassword(passwordRegex.test(text)) // Validate password and update state
  }

  const handleConfirmPasswordChange = (text: string): void => {
    setConfirmPassword(text)
  }

  //Check if phone number is valid
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{5})$/;

  const handlePhoneChange = (text: string) => {
    setPhone(text);
    setIsValidPhone(phoneRegex.test(text));
  };

  // Check if date of birth is valid
  const handleDobChange = (text: string) => {
    setDob(text)
    // You could add further validation here if needed (e.g., check if it's a valid date)
  }

  // Sign up function
  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your inbox for email verification!')
    setLoading(false)
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.formContainer}>
        {/* First name input */}
        <View style={styles.inputWrapper}>
          <Input
            label="First Name"
            leftIcon={{ type: 'font-awesome', name: 'user' }}
            onChangeText={text => setFirstName(text)}
            value={firstName}
            placeholder="John"
            autoCapitalize={'words'}
            containerStyle={styles.input}
            inputContainerStyle={styles.inputField}
          />
        </View>
        {/* Last name input */}
        <View style={styles.inputWrapper}>
          <Input
            label="Last Name"
            leftIcon={{ type: 'font-awesome', name: 'user' }}
            onChangeText={text => setLastName(text)}
            value={lastName}
            placeholder="Doe"
            autoCapitalize={'words'}
            containerStyle={styles.input}
            inputContainerStyle={styles.inputField}
          />
        </View>
        {/* Email input */}
        <View style={styles.inputWrapper}>
          <Input
            label="Email"
            leftIcon={{ type: 'font-awesome', name: 'envelope' }}
            onChangeText={handleEmailChange}
            value={email}
            placeholder="Go@Global.com"
            autoCapitalize={'none'}
            containerStyle={styles.input}
            inputContainerStyle={styles.inputField}
            errorMessage={!isValidEmail ? 'Please enter a valid email' : ''}
          />
        </View>
        {/* Phone input */}
        <View style={styles.inputWrapper}>
          <Input
            label="Phone"
            leftIcon={{ type: 'font-awesome', name: 'phone' }}
            onChangeText={handlePhoneChange}
            value={phone}
            placeholder="(123) 456-7890"
            autoCapitalize={'none'}
            keyboardType="phone-pad"
            containerStyle={styles.input}
            inputContainerStyle={styles.inputField}
            errorMessage={!isValidPhone ? 'Please enter a valid phone number' : ''}
          />
        </View>
        <View style={styles.inputWrapper}>
        <Input
          label="Date of Birth"
          leftIcon={{ type: 'font-awesome', name: 'calendar' }}
          onChangeText={handleDobChange}
          value={dob}
          placeholder="MM/DD/YYYY"
          autoCapitalize={'none'}
          keyboardType="number-pad"  // Use number-pad for date input
          containerStyle={styles.input}
          inputContainerStyle={styles.inputField}
        />
        </View>
        {/* Password input */}
        <View style={styles.inputWrapper}>
          <Input
            label="Password"
            leftIcon={{ type: 'font-awesome', name: 'lock' }}
            onChangeText={handlePasswordChange}
            value={password}
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize={'none'}
            containerStyle={styles.input}
            inputContainerStyle={styles.inputField}
            errorMessage={!isValidPassword ? 'Password must be at least 8 characters long and contain at least one letter and one number' : ''}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Input
            label="Confirm Password"
            leftIcon={{ type: 'font-awesome', name: 'lock' }}
            onChangeText={handleConfirmPasswordChange}
            value={confirmPassword}
            secureTextEntry={true}
            placeholder="Confirm Password"
            autoCapitalize={'none'}
            containerStyle={styles.input}
            inputContainerStyle={styles.inputField}
            errorMessage={confirmPassword !== password ? 'Please confirm your password' : ''}
          />
        </View>

        <View>
          <Button
            title="Sign Up"
            disabled={loading}
            onPress={() => signUpWithEmail()}
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
