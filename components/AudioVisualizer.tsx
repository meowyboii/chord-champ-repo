import { View, Text } from 'react-native'
import React from 'react'
import {useCallback,useState} from 'react'
import { analyzeAudio, scale, sample } from 'react-native-audio-analyzer';
import { Button, ScrollView, StyleSheet } from "react-native";
import ReactNativeBlobUtil from 'react-native-blob-util';



export default function AudioVisualizer() {
    const [result, setResult] = useState([]);

    const start = useCallback(async () => {
      try {
        const path = '../assets/test.mp3';
        const data = await analyzeAudio(path);
        console.log(data);
        // setResult(data);
      } catch (error) {
        console.log(error);
      }
    }, []);
  
    return (
      <View style={styles.container}>
        <Button title="Start" onPress={start} />
        {/* <ScrollView horizontal style={styles.scroll}>
          <View style={styles.row}>
            {result.length > 0 &&
              scale(result.map((_) => _.amplitude)).map((value, index) => (
                <View
                  key={index}
                  style={[styles.item, { height: value * 100 }]}
                />
              ))}
          </View>
        </ScrollView>
        <ScrollView horizontal style={styles.scroll}>
          <View style={styles.row}>
            {result.length > 0 &&
              scale(
                sample(
                  result.map((_) => _.amplitude),
                  20
                )
              ).map((value, index) => (
                <View
                  key={index}
                  style={[styles.item, { height: value * 100 }]}
                />
              ))}
          </View>
        </ScrollView> */}
      </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ffffff',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    scroll: {
      maxHeight: 200,
    },
    item: {
      width: 3,
      backgroundColor: 'blue',
      marginHorizontal: 2,
    },
  });