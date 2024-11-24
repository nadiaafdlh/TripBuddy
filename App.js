import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import DetailExpenses from './screens/DetailExpenses';
import AddTrip from './screens/AddTripScreen';
import AddExpenses from './screens/AddExpenses';
import BottomNav from './components/BottomNav';
import Recommendation from './screens/Recommendation';
import DetailPlace from './screens/DetailPlace';
import Search from './components/Search';
import Popular from './screens/Popular';

// Membuat Context untuk trips
export const TripsContext = createContext();

const Stack = createNativeStackNavigator();

export default function App() {
  // State trips diatur pada App.js agar dapat diakses oleh seluruh aplikasi
  const [trips, setTrips] = useState([
    {
      id: '1',
      name: 'Tokyo',
      country: 'Japan',
      expenses: [
        { id: '1', name: 'Hotel', amount: 500000 },
        { id: '2', name: 'Transport', amount: 200000 },
      ],
    },
    {
      id: '2',
      name: 'Busan',
      country: 'South Korea',
      expenses: [{ id: '1', name: 'Food', amount: 100000 }],
    },
  ]);

  return (
    <TripsContext.Provider value={{ trips, setTrips }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="BottomNav" component={BottomNav} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="DetailExpenses" component={DetailExpenses} />
          <Stack.Screen name="AddTrip" component={AddTrip} />
          <Stack.Screen name="AddExpenses" component={AddExpenses} />
          <Stack.Screen name="Recommendation" component={Recommendation} />
          <Stack.Screen name="DetailPlace" component={DetailPlace} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="Popular" component={Popular} />
        </Stack.Navigator>
      </NavigationContainer>
    </TripsContext.Provider>
  );
}