import { StatusBar } from "expo-status-bar";
import React from "react";
import { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import { Feather, Fontisto, FontAwesome6 } from "@expo/vector-icons";
import AudioVisualizer from "@/components/AudioVisualizer";

export default function Waveform() {
  const [isActive, setIsActive] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | undefined>();
  const [recordings, setRecordings] = useState<
    {
      sound: Audio.Sound;
      duration: string;
      file: string | null;
    }[]
  >([]);
  const [message, setMessage] = useState("");
  const [loudness, setLoudness] = useState<number>(0);

  const [isPaused, setIsPaused] = useState(false);

  const pauseRecording = () => {
    setIsPaused(true);
    // Call your recording pause function here
  };

  const resumeRecording = () => {
    setIsPaused(false);
    // Call your recording resume function here
  };

  //get Loudness
  useEffect(() => {
    setLoudness(-160);
    if (recording) {
      const updateMetering = async () => {
        const status = await recording.getStatusAsync();
        if (status.isRecording) {
          setLoudness(status.metering || 0); // Update metering state with default value of 0 if undefined
        }
      };

      const intervalId = setInterval(updateMetering, 500); // Update metering every 100 milliseconds

      return () => clearInterval(intervalId);
    }
  }, [recording]);

  async function startRecording() {
    try {
      const { status } = await Audio.requestPermissionsAsync();

      if (status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const { recording } = await Audio.Recording.createAsync({
          isMeteringEnabled: true,
          android: {
            extension: ".wav",
            outputFormat: 2, // Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_DEFAULT
            audioEncoder: 3, // Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC
            sampleRate: 44100,
            numberOfChannels: 2,
            bitRate: 128000,
          },
          ios: {
            extension: ".wav",
            audioQuality: 0, // Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH
            sampleRate: 44100,
            numberOfChannels: 2,
            bitRate: 128000,
            linearPCMBitDepth: 16,
            linearPCMIsBigEndian: false,
            linearPCMIsFloat: false,
          },
          web: {
            mimeType: "audio/webm",
            bitsPerSecond: 128000,
          },
        });
        // Set up callback for recording status updates
        recording.setOnRecordingStatusUpdate((update) => {
          console.log("Recording status update:", update);
        });

        setRecording(recording);

        await recording.startAsync();
      } else {
        setMessage(
          "Please grant permission to the app to access the microphone."
        );
      }
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    if (!recording) {
      return; // Nothing to stop
    }

    setRecording(undefined);
    setIsPaused(false);
    await recording.stopAndUnloadAsync();

    let updatedRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();

    // Check if status and durationMillis exist before using them
    const duration =
      status && "durationMillis" in status
        ? getDurationFormatted(status.durationMillis)
        : "Unknown";

    updatedRecordings.push({
      sound: sound,
      duration: duration,
      file: recording.getURI(),
    });

    setRecordings(updatedRecordings);
    setLoudness(-160);
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
          <Text style={{ color: "gray" }}>Play</Text>
        </TouchableOpacity>
      </View>
    ));
  }

  // Generate an array of 15 heights (adjust this as needed)
  const heights = Array.from({ length: 15 }, (_, index) => {
    return index * 10; // Example logic: increasing heights by 10 for each index
  });

  return (
    <View style={styles.container}>
      <Text style={{ color: "gray" }}>{message}</Text>
      <View style={styles.audioBar}>
        {heights.map((height, index) => (
          <AudioVisualizer key={index} height={height} />
        ))}
      </View>
      <Text style={{ color: "gray" }}>{loudness}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.recordButtonContainer}
          onPress={() => {
            if (recording) {
              if (isPaused) {
                resumeRecording();
              } else {
                pauseRecording();
              }
            } else {
              startRecording();
            }
          }}
        >
          {recording ? (
            isPaused ? (
              <Fontisto name="record" size={50} color="#cc2424" />
            ) : (
              <Feather name="pause" size={50} color="#cc2424" />
            )
          ) : (
            <Fontisto name="record" size={50} color="#cc2424" />
          )}
        </TouchableOpacity>
        {recording && !isPaused && (
          <TouchableOpacity style={styles.stopButton} onPress={stopRecording}>
            <FontAwesome6 name="stop-circle" size={50} color="#cc2424" />
          </TouchableOpacity>
        )}
      </View>
      {/* Render the audio visualization */}
      <View style={styles.visualizationContainer}>
        <View
          style={{
            width: Math.pow(Math.max(0, loudness + 140), 1.2),
            height: 30,
            backgroundColor: "gray",
          }}
        />
      </View>
      {getRecordingLines()}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    maxHeight: 100,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    color: "gray",
  },
  fill: {
    flex: 1,
    margin: 16,
    color: "gray",
  },
  button: {
    margin: 16,
  },
  visualizationContainer: {
    width: "100%",
    height: 20,
    backgroundColor: "white",
    marginTop: 20,
    marginBottom: 20,
  },
  audioBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    flex: 1,
    backgroundColor: "transparent",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  recordButtonContainer: {
    marginRight: 16,
  },
  stopButton: {},
});
