import { TouchableOpacity,StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import {useState}from 'react'

export default function RecordButton() {
    const [isRecording, setIsRecording] = useState(false);

  const startRecording = () => {
    // Logic to start recording
    setIsRecording(true);
  };

  const stopRecording = () => {
    // Logic to stop recording
    setIsRecording(false);
  };
  return (
    <TouchableOpacity
      onPress={isRecording ? stopRecording : startRecording}
      style={[styles.button, { backgroundColor: isRecording ? 'red' : 'green' }]}
    >
      <Text style={styles.buttonText}>{isRecording ? 'Stop' : 'Record'}</Text>
    </TouchableOpacity>
  );
  
}
const styles = StyleSheet.create({
    button: {
      width: 150,
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
  