import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Eligibility({ data }: { data: any }) {

  if (!data || !data.payload || !data.payload[0].generalinfo) {
    return <Text>Loading...</Text>;
  }

  const generalInfo = data.payload[0].generalinfo;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let's Check You're Eligible</Text>

      {generalInfo.map((section: any, index: number) => (
        <View key={index} style={styles.sectionContainer}>
          <Text style={styles.header}>{section.header}</Text>

          {section.questions.map((question: string, idx: number) => (
            <Text key={idx} style={styles.question}>
              {question}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 16
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 16,
    textAlign: 'center',
    color: '#2037AA',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  question: {
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 5,
  },
});
