import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Recommendation from '../screens/Recommendation';
import Popular from '../screens/Popular';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Contoh Material Icons

const Tab = createBottomTabNavigator();

export default function BottomNav() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          // Menentukan ikon berdasarkan nama rute
          if (route.name === 'Home') {
            iconName = 'home'; 
          } else if (route.name === 'Profile') {
            iconName = 'person'; 
          } else if (route.name === 'Recommendation') {
            iconName = 'explore'; 
          } else if (route.name === 'Popular') {
            iconName = 'star'; 
          }

          
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Recommendation" component={Recommendation} />
      <Tab.Screen name="Popular" component={Popular} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
