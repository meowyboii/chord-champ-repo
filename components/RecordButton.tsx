import { TouchableOpacity,StyleSheet } from 'react-native';
import { useState }from 'react'
import { Fontisto } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function RecordButton() {
    const [isRecording, setIsRecording] = useState(false);
    const [isActive, setIsActive] = useState(false);

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
    >
      {isActive? <AntDesign name="pausecircleo" size={50} color="#aa0c0c" onPress={()=>{
          setIsActive(!isActive)}}/>:
      <Fontisto name="record" size={50} color="#aa0c0c" onPress={()=>{
          setIsActive(!isActive)}} />
      }
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
  