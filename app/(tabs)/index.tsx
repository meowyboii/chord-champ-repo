
import React from 'react';
import { StyleSheet, Image } from 'react-native';
import Waveform from '@/components/Waveform';
import { Text, View } from '@/components/Themed';
import ChordChart from '@/components/ChordChart';
import RecordButton from '@/components/RecordButton';
import { LinearGradient } from 'expo-linear-gradient';
import AudioVisualizer from '@/components/AudioVisualizer';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <View style={[styles.header, styles.elevation]}>
        <LinearGradient colors={['#ff7f50', '#cc2424']} start={{ x: 0.7, y: 0 }} style={styles.child}>
          <Image source={require('../../assets/images/logocolor.png')} style={styles.image} />
          <Text style={styles.title}>ChordChamp</Text>
        </LinearGradient>
      </View>
      <ChordChart/>
      <Waveform/>
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
  header: {
    flex: 2.5,
    alignItems: 'center',
    flexDirection:'row',
    width : '100%',
    transform : [ { scaleX : 2 } ],
    borderBottomStartRadius : 500,
    borderBottomEndRadius : 500,
    overflow : 'hidden',
  },
  child : {
    flex : 1,
    transform : [ { scaleX : 0.5 } ],
    height : '100%',
    width : '100%',
    alignItems : 'center',
    justifyContent : 'center'
  },
  title: {
    margin: 5,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
  },
  separator: {
    marginVertical: 15,
    height: 1,
    width: '80%',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 100,
  },
  elevation: {
    elevation: 120,
    shadowColor: '#aa0c0c',
  },
});
