import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function Waveform() {
  return (
    <View style={styles.container}>
      <View style={styles.panel}>
        <Text style={styles.panelText}>Waveform Here</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  panel: {
    backgroundColor: 'gray', 
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: '100%',
    height: '75%',
  },
  panelText: {
    color: 'white',
    fontSize: 20,
  },
});