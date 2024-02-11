import React, { useState } from 'react';
import { Platform, PermissionsAndroid, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Waveform = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordSecs, setRecordSecs] = useState(0);
  const [recordTime, setRecordTime] = useState('');

  const onStartRecord = async () => {
    // Requesting permissions for Android
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);
  
        // Check if all required permissions are granted
        if (
          granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('All required permissions granted');
          startRecording(); // Start recording if permissions are granted
        } else {
          console.log('Some permissions not granted');
        }
      } catch (err) {
        console.error('Permission request error:', err);
      }
    } else {
      // Start recording for iOS (no need to request permissions)
      startRecording();
    }
  };


  const startRecording = async () => {
    try {

    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={isRecording ? startRecording : onStartRecord}
        style={[styles.button, { backgroundColor: isRecording ? 'red' : 'green' }]}
      >
        <Text style={styles.buttonText}>{isRecording ? 'Stop' : 'Record'}</Text>
      </TouchableOpacity>
      <View style={styles.recordInfo}>
        <Text>Record Time: {recordTime}</Text>
        <Text>Record Secs: {recordSecs}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    width: 150,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  recordInfo: {
    marginTop: 20,
  },
});

export default Waveform;