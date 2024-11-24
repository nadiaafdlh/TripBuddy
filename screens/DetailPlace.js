import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const DetailPlace = ({ route }) => {
  const { placeId } = route.params; // Dapatkan placeId dari navigasi
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State untuk error handling

  const fetchPlaceDetails = async () => {
    setLoading(true);
    setError(null); // Reset error state setiap kali fetch dilakukan
    try {
      console.log('Fetching details for Place ID:', placeId); // Debugging untuk ID
      const response = await axios.get(
        `https://travel-advisor.p.rapidapi.com/locations/v2/auto-complete`, // Ubah endpoint
        {
          params: { location_id: placeId, lang: 'en_US' },
          headers: {
            'X-RapidAPI-Key': '6367f86820msh804fc1834bfbb1dp1bb269jsne6a4a5c6966b', // Ganti dengan API key Anda
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
          },
        }
      );
      console.log('Details Response:', response.data); // Debugging untuk hasil
      setDetails(response.data); // Simpan data lengkap
    } catch (err) {
      console.error('Error fetching place details:', err); // Debugging untuk error
      setError('Failed to fetch details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaceDetails();
  }, [placeId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{details?.name || 'No Name Available'}</Text>
      <Text>{details?.description || 'No description available.'}</Text>
    </View>
  );
};

export default DetailPlace;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  error: { color: 'red', textAlign: 'center', fontSize: 16 },
});
