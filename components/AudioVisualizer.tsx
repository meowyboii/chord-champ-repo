import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

interface AudioVisualizerProps {
  height?: number; // Optional height prop
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ height: initialHeight }) => {
  const [height, setHeight] = useState<number>(initialHeight || 200); // Initial height of the waveform
  const animation = useRef<Animated.Value>(new Animated.Value(0)).current;

  useEffect(() => {
    const slideUp = () => {
      Animated.timing(animation, {
        toValue: 1,
        duration: 400, // Adjust the duration as needed
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (finished) {
          slideDown(); // Start slide down animation after slide up finishes
        }
      });
    };

    const slideDown = () => {
      Animated.timing(animation, {
        toValue: 0,
        duration: 400, // Duration for the slide-down animation
        useNativeDriver: false,
      }).start();
    };

    slideUp(); // Start slide up animation on render

    // Return cleanup function
    return () => {
      animation.setValue(0); // Reset animation value when component unmounts
    };
  }, [height]);

  useEffect(() => {
    setHeight(initialHeight || 200); // Update height when prop changes
  }, [initialHeight]);

  const animatedStyle = {
    height: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, height],
    }),
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.bar, animatedStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 50,
    backgroundColor: 'gray',
  },
});

export default AudioVisualizer;