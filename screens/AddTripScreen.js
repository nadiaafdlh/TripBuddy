import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
} from 'react-native';

export default function AddTrip({ navigation, route }) {
  const { addTrip } = route.params; // Fungsi untuk menambah trip baru di HomeScreen
  const [tripName, setTripName] = useState('');
  const [tripCountry, setTripCountry] = useState('');

  const handleSave = () => {
    if (!tripName || !tripCountry) {
      Alert.alert('Invalid Input', 'All fields are required!');
      return;
    }

    // objek trip baru
    const newTrip = {
      id: Date.now().toString(), 
      name: tripName,
      country: tripCountry,
      expenses: [], 
    };

    addTrip(newTrip); // Memanggil fungsi dari HomeScreen
    navigation.goBack(); // Kembali ke HomeScreen setelah menambah trip
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Where are you going?</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter trip name"
        value={tripName}
        onChangeText={setTripName}
      />
      <Text style={styles.label}>Which country?</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter country name"
        value={tripCountry}
        onChangeText={setTripCountry}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 16, marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});
