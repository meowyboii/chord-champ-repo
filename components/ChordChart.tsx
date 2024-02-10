import { StyleSheet } from 'react-native';
import React from 'react';
import { Text, View } from '@/components/Themed';

export default function ChordChart() {
  const items = Array.from({ length: 25 }, (_, index) => index + 1);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Am7</Text>
      <View style={styles.container}>
        {items.map((item, index) => (
          <View
            key={item}
            style={[
              styles.item,
              // Apply firstRowItem style to items in the first row
              index < 5 ? styles.firstRowItem : null,
            ]}
          ></View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'transparent',
    marginTop: 30,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 15,
    width: 100,
    maxHeight: 200,
  },
  item: {
    width: '20%', // 5 items in a row
    height: 25,
    backgroundColor: 'whitesmoke',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1, // Default border width
    borderColor: 'gray', // Default border color
  },
  firstRowItem: {
    borderTopWidth: 7, // Higher border width for the first row
    borderTopColor: 'gray', // Color for the first row border
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 5,
  },
});