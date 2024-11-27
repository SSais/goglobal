import { StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { View } from "react-native";

import Auth from "../components/Auth/Auth";

export default function RootLayout() {
  return (
    <View style={styles.container}>
      <Stack>
        <Auth />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
  },
});