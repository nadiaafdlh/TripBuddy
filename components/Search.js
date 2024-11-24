import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function Search({ setCity, onSearch }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Enter city"
        onChangeText={setCity}
      />
      <Button title="Search" onPress={onSearch} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', marginBottom: 20, justifyContent: 'space-between' },
  searchInput: { borderWidth: 1, flex: 1, marginRight: 10, padding: 10, borderRadius: 5 },
});
