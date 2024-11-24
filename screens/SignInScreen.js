import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

export default function SignInScreen({ navigation }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleSignIn = () => {
    if (credentials.username && credentials.password) {
      navigation.navigate('BottomNav');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter username"
        value={credentials.username}
        onChangeText={(text) => setCredentials({ ...credentials, username: text })}
      />
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        secureTextEntry
        value={credentials.password}
        onChangeText={(text) => setCredentials({ ...credentials, password: text })}
      />
      <Button title="Sign In" onPress={handleSignIn} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 20, borderRadius: 5 },
});
