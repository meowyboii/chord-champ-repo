import { StyleSheet } from "react-native";
import React from 'react';
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Audio } from 'expo-av';
import { Button } from 'react-native';

export default function TabOneScreen() {
  const [recording, setRecording] = React.useState();
  const [recordings, setRecordings] = React.useState([]);
  const [message, setMessage] = React.useState("");

  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionAsync();

      if (permission.status === "granted"){
        await Audio.setAudioModeAsyng({
          allowsRecordingIOS: true,
          playsInSilentMode: true
        });

        const { recording } = await Audio.Recording.createAsync(
          audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );

        setRecording(recording);
      }
      else {
        setMessage("Please grant permission to app to access the microphone :))");
      }
    } catch (err) {
      console.error('Failed to Start Recording', err)
    }
  }

  async function stopRecording() {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();

    let updatedRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    updatedRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI()
    });

    setRecordings(updatedRecordings);

  }

  function getDurationFormatted(millis) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }

  function getRecordingLines() {
    return recordings.map((recordingLine, index) => {
      return (
        <View key={index} style={styles.row}>
          <Text style={styles.fill}>
            Recording {index + 1} = {recordingLine.duration}
          </Text>
          <Button style={styles.button} onPress={() => recordingLine.sound.replayAsync()}title="Play">
            </Button>
        </View>
      );
    });
   }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chord Recognition</Text>
      <Text style={styles.title}>Recording Button VVV </Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Button>
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording} 
      </Button>
      {getRecordingLines()}

      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fill: {
    flex: 1,
    margin: 16,
  },
  button: {
    margin: 16,
  },
});
