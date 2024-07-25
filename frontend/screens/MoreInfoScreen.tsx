import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [ename, seteName] = useState<string>('');
  const [ephone, setePhone] = useState<string>('');
  const navigation = useNavigation();

  const handleLogin = () => {
    if (!phone || !name) {
      Alert.alert('Error', 'Please enter all info');
      return;
    }

    navigation.navigate('MainPage');  // Ensure this matches the registered screen name
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={[styles.title, styles.MarginBottom60]}>A bit more Info😊</Text>
        <Text style={styles.label}>Enter your full name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.label}>Enter your phone number:</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="numeric"
        />
        <Text style={styles.label}>Enter main emergency contact's name:</Text>
        <TextInput
          style={styles.input}
          placeholder="EC Name"
          value={ename}
          onChangeText={seteName}
        />
        <Text style={styles.label}>Enter main emergency contact's phone number:</Text>
        <TextInput
          style={styles.input}
          placeholder="EC Phone number"
          value={ephone}
          onChangeText={setePhone}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
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
  form: {
    width: '80%',
  },
  title: { // Title style
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  MarginBottom60: {
    marginBottom: 60, // Adjust this value as needed
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#93B9BD',
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
