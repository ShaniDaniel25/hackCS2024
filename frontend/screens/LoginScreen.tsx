import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigation = useNavigation();

   const handleLogin = async () => {
        if (!username || !password) {
        Alert.alert('Error', 'Please enter both username and password');
        return;
        }

        console.log('Username:', username);
        console.log('Password:', password);
        
    // const url = `http://localhost:3001/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
        
        const url = `http://172.20.10.5:3001/login?username=${username}&password=${password}`;
        console.log('Username:', username);
    // const url = `http://localhost:3001/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

        console.log('test')

        // Send a GET request to the /login endpoint
        const response =  fetch(url, {
        method: 'GET',
        });
       
        // if (!response.ok) {
        //     console.log('teststst')
        //     throw new Error('Login failed');
        //     }
        // Handle the response data, e.g., navigate to another screen or save the token
        navigation.navigate('MoreInfo');  // Ensure this matches the registered screen name
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>New user!😊</Text>
        <Text style={[styles.title, styles.MarginBottom60]}>Who are you?</Text>
        <Text style={styles.label}>Enter your username:</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          keyboardType="email-address"
        />
        <Text style={styles.label}>Enter your password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Next</Text>
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
