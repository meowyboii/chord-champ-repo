import { StyleSheet } from 'react-native';
import React from 'react';
import Waveform from '@/components/Waveform';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import Recording from '@/components/Chord-recognition/recordingcomponent';
import ChordChart from '@/components/ChordChart';
import RecordButton from '@/components/RecordButton';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ChordChamp</Text>
      <Recording/>
      <Waveform/>
      <ChordChart/>
      <RecordButton/>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    margin: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
