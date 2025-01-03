import React, { useState } from 'react'
import { Alert, StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import { supabase } from '../../lib/supabase'
import { Button, Input } from '@rneui/themed'
import { useRouter } from 'expo-router';

export default function SignUp() {
  const router = useRouter();
  //State to store user details and check validity
  const [email, setEmail] = useState<string>('')
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true)

  const [password, setPassword] = useState<string>('')
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
  const passwordRegex = /^(?=.*\d).{8,}$/

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
  }

  // Validate all fields and sign up
  async function handleValidatSignUp() {
    isValidEmail && isValidPassword && isValidPhone && confirmPassword && firstName && lastName && dob ? signUpWithEmail() :
    Alert.alert('Please fill in all fields correctly');
  }

  // Sign up function
  async function signUpWithEmail() {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            phone: phone,
            dob: dob,
          },
        },
      });
  
      if (error) {
        Alert.alert('Sign-up Error', error.message);
        return;
      }
  
      const { user } = data;
      if (user) {
        // Insert user profile data into the 'profiles' table
        const { error: insertError } = await supabase
          .from('profiles')
          .upsert({
            id: user.id,
            first_name: firstName,
            last_name: lastName,
            phone: phone,
            dob: dob,
          })
          .single();
  
        if (insertError) {
          Alert.alert('Profile Creation Error', insertError.message);
        } else {
          console.log('Profile created for user:', user);
        }
      }
      
      Alert.alert('Success');
    } catch (err) {
      Alert.alert('An unexpected error occurred');
    } finally {
      setLoading(false);
      router.push('/dashboard');
    }
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
            onPress={() => handleValidatSignUp()}
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f3f4f6', // Soft neutral background
  },
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    width: '100%',
    padding: 20,
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
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
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2, // For Android shadow
  },
  button: {
    backgroundColor: '#2563eb', // Sharper blue for the button
    borderRadius: 10,
    paddingVertical: 14,
    width: '100%',
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3, // For Android shadow
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});
