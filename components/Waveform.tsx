import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function Waveform() {
  return (
    <View style={styles.container}>
      <Text>Waveform</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    maxHeight: 40,
  },
});