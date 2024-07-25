import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'; // Import the hook

const ToolsScreen: React.FC = () => {
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const navigation = useNavigation(); // Use the hook to access the navigation object

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
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-left" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.title}>Preferred Tools</Text>
      <View style={styles.gridContainer}>
        {[
          { name: 'Flashlight', emoji: '🔦' },
          { name: 'Battery Saver', emoji: '🔋' },
          { name: 'Vibration', emoji: '📳' },
          { name: 'Alarm Sound', emoji: '🔔' },
        ].map(tool => (
          <TouchableOpacity
            key={tool.name}
            style={[styles.toolButton, isSelected(tool.name) && styles.toolButtonPressed]}
            onPress={() => toggleTool(tool.name)}
          >
            <Text style={styles.emoji}>{tool.emoji}</Text>
            <Text style={[styles.toolButtonText, styles.boldText]}>{tool.name}</Text>
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
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    marginBottom: 50,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 70, // Adjust as needed for your layout
    left: 30, // Adjust as needed for your layout
    backgroundColor: '#93B9BD',
    borderRadius: 50,
    padding: 10,
  },
  gridContainer: {
    width: '80%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toolButton: {
    backgroundColor: '#93B9BD',
    width: '48%',
    aspectRatio: 0.7,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolButtonPressed: {
    backgroundColor: '#11C55C',
  },
  emoji: {
    fontSize: 80,
    marginBottom: 15,
  },
  toolButtonText: {
    color: 'white',
    fontSize: 18,
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default ToolsScreen;
