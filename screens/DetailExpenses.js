import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

export default function DetailExpenses({ navigation, route }) {
  const { tripId, tripName, expenses: initialExpenses, addExpenseToTrip, deleteExpenseFromTrip } = route.params;
  const [expenses, setExpenses] = useState(initialExpenses);

  // Fungsi untuk menambahkan pengeluaran
  const addExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]); // Update local state
    addExpenseToTrip(tripId, newExpense); // Update global state in HomeScreen.js
  };

  // Fungsi untuk menghapus pengeluaran
  const deleteExpense = (expenseId) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this expense?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            const updatedExpenses = expenses.filter((expense) => expense.id !== expenseId);
            setExpenses(updatedExpenses); // Update local state
            deleteExpenseFromTrip(tripId, expenseId); // Update global state in HomeScreen.js
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{tripName || 'Trip Details'}</Text>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.name}</Text>
            <Text>Rp {item.amount}</Text>
            <TouchableOpacity onPress={() => deleteExpense(item.id)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Button
        title="Add Expense"
        onPress={() =>
          navigation.navigate('AddExpenses', { addExpense })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  deleteText: { color: 'red', fontWeight: 'bold' },
});
