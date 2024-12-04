import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

const questions = [
  { question: 'Do you hold a British Passport?', label1: 'Yes', label2: 'No' },
  { question: 'What country do you want to move to?', label1: 'Spain' },
  { question: 'Do you want to apply for a Digital Nomad visa?', label1: 'Yes', label2: 'No' },
];

const DropdownComponent = () => {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  const handleChange = (value: string, index: number) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
    console.log(`Question ${index + 1}: ${value}`);
    console.log(answers);
  };

  return (
    <View>
      {questions.map((question, index) => {
        const data = [
          { label: question.label1 },
          question.label2 && { label: question.label2 },
        ].filter(Boolean);

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
