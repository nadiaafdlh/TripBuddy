import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import { TripsContext } from '../App';

export default function HomeScreen({ navigation }) {
  const [trips, setTrips] = useState([
    {
      id: '1',
      name: 'Tokyo',
      country: 'Japan',
      expenses: [{ id: '1', name: 'Hotel', amount: 700000 }],
    },
    {
      id: '2',
      name: 'Busan',
      country: 'South Korea',
      expenses: [{ id: '2', name: 'Food', amount: 450000 }],
    },
    {
      id: '3',
      name: 'NewYork',
      country: 'USA',
      expenses: [{ id: '3', name: 'Transport', amount: 12000000 }],
    },
    {
        id: '4',
        name: 'Bali',
        country: 'Indonesia',
        expenses: [{ id: '3', name: 'Transport', amount: 3000000 }],
      },
  ]);

  const addTrip = (newTrip) => {
    setTrips((prevTrips) => [...prevTrips, newTrip]);
  };

  const addExpenseToTrip = (tripId, newExpense) => {
    setTrips((prevTrips) =>
      prevTrips.map((trip) =>
        trip.id === tripId
          ? { ...trip, expenses: [...trip.expenses, newExpense] }
          : trip
      )
    );
  };

  const deleteExpenseFromTrip = (tripId, expenseId) => {
    setTrips((prevTrips) =>
      prevTrips.map((trip) =>
        trip.id === tripId
          ? { ...trip, expenses: trip.expenses.filter((exp) => exp.id !== expenseId) }
          : trip
      )
    );
  };

  const formatIDR = (amount) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.logoutButton}
          onPress={() => navigation.navigate('Splash')}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
        <View style={styles.headerContent}>
          <Image
            source={require('../assets/logo.png')} 
            style={styles.logo}
          />
          <Text style={styles.title}>TripBuddy</Text>
        </View>
      </View>
      <FlatList
        data={trips}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('DetailExpenses', {
                tripId: item.id,
                tripName: item.name,
                tripCountry: item.country,
                expenses: item.expenses,
                addExpenseToTrip,
                deleteExpenseFromTrip,
              })
            }
          >
            <View style={styles.card}>
              <Text>{item.name}</Text>
              <Text>{item.country}</Text>
              <Text>
                Total Expenses: {formatIDR(item.expenses.reduce((sum, expense) => sum + expense.amount, 0))}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Text>Your Trips</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('AddTrip', { addTrip })}
              style={styles.addTripButton}
            >
              <Text style={styles.addTripText}>+ Add Trip</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  logoutButton: {
    position: 'absolute',
    right: 5,
    top: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#ff6f61',
    borderRadius: 5,
  },
  logoutText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
    marginLeft: 0, 
  },
  logo: {
    width: 150,
    height: 200,
    marginBottom: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  card: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  addTripButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  addTripText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

