import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

const questions = [
  { question: 'What Passport do you hold?', label1: 'British', label2: 'Other' },
  { question: 'What country do you want to move to?', label1: 'Spain' },
  { question: 'What visa type do you want to apply for?', label1: 'Digital Nomad', label2: 'Other' },
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
      setError('You can only apply for a Digital Nomad visa at this time');
      return;
    }
    setError('');
  };

  return (
    <View>
      {questions.map((question, index) => {
        // Define data with explicit type
        const data: DropdownItem[] = [
          { label: question.label1 },
          question.label2 ? { label: question.label2 } : undefined,
        ].filter(Boolean) as DropdownItem[];  // Type assertion

        return (
          <View key={index} style={styles.questionContainer}>
            <Text>{question.question}</Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              maxHeight={300}
              labelField="label"
              valueField="label"
              placeholder="Select item"
              value={answers[index] || ''} // Get the answer for this question
              onChange={(item) => handleChange(item.label, index)}
              renderLeftIcon={() => (
                <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
              )}
            />
          </View>
        );
      })}
      <Text>{error}</Text>
      <Button onPress={handleSubmit} title='Submit answers'></Button>
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  questionContainer: {
    marginVertical: 10,
  },
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
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
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
