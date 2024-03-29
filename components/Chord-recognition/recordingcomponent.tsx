import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';

export default function TabOneScreen() {
  const [recording, setRecording] = React.useState<Audio.Recording | undefined>();
  const [recordings, setRecordings] = React.useState<{
    sound: Audio.Sound;
    duration: string;
    file: string | null;
  }[]>([]);
  const [message, setMessage] = React.useState("");

  async function startRecording() {
    try {
      const { status } = await Audio.requestPermissionsAsync();
  
      if (status === 'granted') {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
  
        const { recording } = await Audio.Recording.createAsync({
          android: {
            extension: '.wav',
            outputFormat: 2, // Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_DEFAULT
            audioEncoder: 3, // Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC
            sampleRate: 44100,
            numberOfChannels: 2,
            bitRate: 128000,
          },
          ios: {
            extension: '.wav',
            audioQuality: 0, // Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH
            sampleRate: 44100,
            numberOfChannels: 2,
            bitRate: 128000,
            linearPCMBitDepth: 16,
            linearPCMIsBigEndian: false,
            linearPCMIsFloat: false,
          },
          web: {}, // Add a dummy web property
        });
  
        setRecording(recording);
  
        await recording.startAsync();
      } else {
        setMessage('Please grant permission to the app to access the microphone.');
      }
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    if (!recording) {
      return; // Nothing to stop
    }
  
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
  
    let updatedRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
  
    // Check if status and durationMillis exist before using them
    const duration = status && 'durationMillis' in status
      ? getDurationFormatted(status.durationMillis)
      : 'Unknown';
  
    updatedRecordings.push({
      sound: sound,
      duration: duration,
      file: recording.getURI()
    });
  
    setRecordings(updatedRecordings);
  }

  function getDurationFormatted(millis?: number) {
    const minutes = (millis || 0) / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }

  function getRecordingLines() {
  return recordings.map((recordingLine, index) => (
    <View key={index} style={styles.row}>
      <Text style={styles.fill}>
        Recording {index + 1} = {recordingLine.duration}
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => recordingLine.sound.replayAsync()}
      >
        <Text>Play</Text>
      </TouchableOpacity>
    </View>
  ));
}

  return (
    <View style={styles.container}>
      <Text>{message}</Text>
      <Button
        title={recording ? "Stop Recording" : "Start Recording"}
        onPress={recording ? stopRecording : startRecording} />
      {getRecordingLines()}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fill: {
    flex: 1,
    margin: 16
  },
  button: {
    margin: 16
  }
});