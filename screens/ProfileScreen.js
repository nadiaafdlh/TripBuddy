import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      {/* Gambar Profil */}
      <View style={styles.profileImageContainer}>
        <Image
          source={{ uri: 'https://avatars.githubusercontent.com/u/116475964?v=4' }} 
          style={styles.profileImage}
        />
      </View>

      {/* Nama dan Email */}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>Nadia Faadhillah</Text>
        <Text style={styles.nim}>21120122140133</Text>
        <Text style={styles.email}>nadiaafdlh184@gmail.com</Text>
        <Text style={styles.github}> https://github.com/nadiaafdlh </Text>
      </View>

    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    padding: 20,
  },
  profileImageContainer: {
    marginBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    top: 25,
    width: 120,
    height: 120,
    borderRadius: 80,
    borderWidth: 4,
    borderColor: '#fff',
  },
  infoContainer: {
    marginBottom:530,
    alignItems: 'center',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  nim: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 5,
  },
   
  email: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  
  github: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
});
