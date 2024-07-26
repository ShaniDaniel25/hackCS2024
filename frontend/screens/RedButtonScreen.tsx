import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RedButtonScreen = () => {
  const navigation = useNavigation();

  const showAlert = () => {
    Alert.alert(
      "Are you sure?",
      "",
      [
        { text: "No", onPress: () => console.log("No Pressed"), style: "cancel" },
        { text: "Yes", onPress: () => navigation.navigate('Tools') }
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.sosButton} onPress={showAlert}>
        <Text style={styles.sosButtonText}>SOS</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  sosButton: {
    width: 200,
    height: 200,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  sosButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default RedButtonScreen;