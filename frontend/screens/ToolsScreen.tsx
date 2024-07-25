import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ToolsScreen = () => {
  const [selectedTools, setSelectedTools] = useState<string[]>([]);

  const toggleTool = (tool: string) => {
    setSelectedTools(prevSelectedTools =>
      prevSelectedTools.includes(tool)
        ? prevSelectedTools.filter(t => t !== tool)
        : [...prevSelectedTools, tool]
    );
  };

  const isSelected = (tool: string) => selectedTools.includes(tool);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Tools</Text>
      <View style={styles.buttonContainer}>
        {['Flashlight', 'Battery Saver', 'Vibration', 'Alarm Sound'].map(tool => (
          <TouchableOpacity
            key={tool}
            style={isSelected(tool) ? styles.toolButtonPressed : styles.toolButton}
            onPress={() => toggleTool(tool)}
          >
            <Text style={styles.toolButtonText}>{tool}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '80%',
    justifyContent: 'center',
  },
  toolButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  toolButtonPressed: {
    backgroundColor: '#0056b3',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  toolButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default ToolsScreen;
