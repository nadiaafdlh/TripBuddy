import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import Search from '../components/Search';

const Recommendation = ({ navigation }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecommendations = async (city = '') => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        'https://travel-advisor.p.rapidapi.com/locations/v2/auto-complete',
        {
          params: { query: city || 'popular', lang: 'en_US', units: 'km' },
          headers: {
            'X-RapidAPI-Key': 'de53bc0d7dmshd172536226f87f4p187b7ejsnc95b47bf8294', // Ganti dengan API Key valid
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
          },
        }
      );
      console.log('API Response:', response.data);
      const data = response.data.data || [];
      setRecommendations(data);
    } catch (error) {
      console.error('Error fetching recommendations:', error.response?.data || error.message);
      setError(
        error.response?.status === 403
          ? 'Access forbidden: Please check your API Key or permissions.'
          : 'Failed to load recommendations.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  return (
    <View style={styles.container}>
      <Search onSearch={(city) => fetchRecommendations(city)} />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={{ color: 'red' }}>{error}</Text>
      ) : recommendations.length === 0 ? (
        <Text>No recommendations available.</Text>
      ) : (
        <FlatList
          data={recommendations}
          keyExtractor={(item) => item.result_object?.location_id || item.id || Math.random().toString()}
          renderItem={({ item }) => (
            <Text
              style={styles.item}
              onPress={() =>
                navigation.navigate('DetailPlace', { placeId: item.result_object?.location_id })
              }
            >
              {item.result_object?.name || 'No name available'}
            </Text>
          )}
        />
      )}
    </View>
  );
};

export default Recommendation;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  item: { padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
});
