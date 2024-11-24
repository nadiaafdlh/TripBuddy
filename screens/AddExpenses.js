import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';

export default function AddExpenses({ navigation, route }) {
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');

  const saveExpense = () => {
    // Validasi input
    if (expenseName.trim() === '' || expenseAmount.trim() === '') {
      Alert.alert('Invalid Input', 'Please fill out all fields.', [
        { text: 'OK' },
      ]);
      return;
    }

    // Buat object pengeluaran baru
    const newExpense = {
      id: Date.now().toString(), // ID unik berbasis timestamp
      name: expenseName,
      amount: parseFloat(expenseAmount), 
    };

    // Kirim data pengeluaran baru ke halaman DetailExpenses.js
    route.params?.addExpense(newExpense);

    // Kembali ke halaman DetailExpenses
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Expense</Text>
      <TextInput
        style={styles.input}
        placeholder="For what?"
        value={expenseName}
        onChangeText={(text) => setExpenseName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="How much?"
        value={expenseAmount}
        onChangeText={(text) => setExpenseAmount(text)}
        keyboardType="numeric"
      />
      <Button title="Save" onPress={saveExpense} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});
