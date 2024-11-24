import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

const Popular = ({ navigation }) => {
  const [popularPlaces, setPopularPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPopularPlaces = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://travel-advisor.p.rapidapi.com/locations/search',
        {
          params: { query: 'popular', lang: 'en_US', units: 'km' },
          headers: {
            'X-RapidAPI-Key': 'de53bc0d7dmshd172536226f87f4p187b7ejsnc95b47bf8294',
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
          },
        }
      );
      const data = response.data.data;
      setPopularPlaces(data); // Simpan hasil API.
    } catch (error) {
      console.error('Error fetching popular places:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularPlaces(); // Muat data pada saat pertama kali.
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={popularPlaces}
          keyExtractor={(item) => item.result_object?.location_id}
          renderItem={({ item }) => (
            <Text
              style={styles.item}
              onPress={() =>
                navigation.navigate('DetailPlace', { placeId: item.result_object?.location_id })
              }
            >
              {item.result_object?.name}
            </Text>
          )}
        />
      )}
    </View>
  );
};

export default Popular;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  item: { padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
});
