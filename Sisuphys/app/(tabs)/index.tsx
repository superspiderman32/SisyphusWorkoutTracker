import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [liftCount, setLiftCount] = useState(0);
  return (
    <View style={styles.container}>
      {/* This makes the phone's clock/battery icons white */}
      <StatusBar barStyle="light-content" />

      <Text style={styles.title}>SISUPHYS</Text>
      <Text style={styles.subtitle}>The struggle is the reward.</Text>
      <Text style={styles.subtitle}>Boulder lifted {liftCount} times</Text>

      <View style={styles.boulder} />

      {/* Button */}
      <TouchableOpacity
        onPress={() => setLiftCount(liftCount + 1)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Push Boulder</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // Dark "stone" background
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 42,
    fontWeight: "bold",
    letterSpacing: 5,
  },
  subtitle: {
    color: "#888",
    fontSize: 16,
    fontStyle: "italic",
    marginTop: 10,
  },
  boulder: {
    width: 60,
    height: 60,
    backgroundColor: "#444",
    borderRadius: 30, // Makes it a circle
    marginTop: 50,
  },
  button: {
    backgroundColor: "#d33d02",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 40,
    borderWidth: 1,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: 2,
  },
});
