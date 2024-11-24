import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';

export default function SplashScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Logo Aplikasi */}
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Trip Buddy</Text>
      
      {/* Tombol Navigasi */}
      <View style={styles.buttonContainer}>
        <Button
          title="Sign In"
          onPress={() => navigation.replace('SignIn')} 
        />
        <Button
          title="Sign Up"
          onPress={() => navigation.navigate('SignUp')} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  logo: {
    width: 150,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10, 
  },
});
