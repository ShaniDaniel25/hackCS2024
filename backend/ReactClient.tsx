import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, Button, FlatList, View } from 'react-native';

const App = () => {
  const [ws, setWs] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const webSocket = new WebSocket('ws://localhost:8765');

    webSocket.onopen = () => {
      console.log('WebSocket connection opened');
    };

    webSocket.onmessage = (e) => {
      const receivedMessage = e.data;
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    };

    webSocket.onclose = (e) => {
      console.log('WebSocket connection closed', e);
    };

    webSocket.onerror = (e) => {
      console.log('WebSocket error', e.message);
    };

    setWs(webSocket);

    return () => {
      webSocket.close();
    };
  }, []);

  const sendMessage = () => {
    if (ws && message) {
      ws.send(message);
      setMessage('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{item}</Text>
          </View>
        )}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter location:message"
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Send Message" onPress={sendMessage} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  messageContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  messageText: {
    fontSize: 16,
  },
});

export default App;
