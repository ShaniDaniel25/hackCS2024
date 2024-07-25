// screens/RedButtonScreen.js
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import commonStyles from './commonStyles';

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
    <SafeAreaView style={commonStyles.container}>
      <TouchableOpacity style={[commonStyles.button, styles.sosButton]} onPress={showAlert}>
        <Text style={[commonStyles.buttonText, styles.sosButtonText]}>SOS</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sosButton: {
    width: 200,
    height: 200,
    backgroundColor: 'red',
    borderRadius: 100,
  },
  sosButtonText: {
    fontSize: 24,
  },
});

export default RedButtonScreen;
