import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { LinearGradient } from 'expo-linear-gradient'; 

const questions = [
  { question: 'What is your nationality?', label1: 'British', label2: 'Other' },
  { question: 'Where do you want to relocate to?', label1: 'Spain' },
  { question: 'Which type of visa are you interested in?', label1: 'Digital Nomad', label2: 'Other' },
];

// Define the type for the dropdown items
interface DropdownItem {
  label: string;
}

const DropdownComponent = () => {
  const [answers, setAnswers] = useState<Record<number, string | undefined>>({});
  const [error, setError] = useState<string>('');

  const handleChange = (value: string, index: number) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  };

  const handleSubmit = () => {
    console.log(answers);
    if (Object.keys(answers).length !== questions.length) {
      setError('Please answer all questions');
      return;
    }
    if (answers[0] === 'Other') {
      setError('You must hold a British Passport to apply');
      return;
    }
    if (answers[2] === 'Other') {
      setError('Sorry, you can only apply for a Digital Nomad visa at this time');
      return;
    }
    setError('');
  };

  return (
    <View style={styles.mainContainer}>
      <LinearGradient
        // Background Linear Gradient
        colors={['#D9E4F4', '#D0F4DC']}
        style={styles.background}
      />
      <Text style={styles.title}>Your journey begins here</Text>
      {questions.map((question, index) => {
        // Define data with explicit type
        const data: DropdownItem[] = [
          { label: question.label1 },
          question.label2 ? { label: question.label2 } : undefined,
        ].filter(Boolean) as DropdownItem[];  // Type assertion

        return (
          <View key={index} style={styles.questionContainer}>
            <Text style={styles.text}>{question.question}</Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              data={data}
              maxHeight={300}
              labelField="label"
              valueField="label"
              placeholder="Select item"
              value={answers[index] || ''} // Get the answer for this question
              onChange={(item) => handleChange(item.label, index)}
            />
          </View>
        );
      })}
      <Text style={styles.error}>{error}</Text>
      <Button onPress={handleSubmit} title='Submit answers'></Button>
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    paddingTop: 15,
    fontWeight: 'bold',
    marginVertical: 16,
    textAlign: 'center',
    color: '#2037AA',
  },
  mainContainer: {
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
  },
  background:{
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  questionContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 1,
    },
    marginVertical: 10,
  },
  text : {
    fontSize: 16,
    color: '#2037AA',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  dropdown: {
    marginTop: 8,
    marginBottom: 16,
    padding: 10,
    height: 70,
    borderColor: '#2037AA',
    borderRadius: 20,
    borderWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 12,
  },
});
