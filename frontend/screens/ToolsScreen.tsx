import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import Torch from 'react-native-torch';
import * as Permissions from 'expo-permissions';
import { Audio } from 'expo-av';
import { Camera } from 'expo-camera';
import * as Asset from 'expo-asset';

import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'; // Import the hook

const ToolsScreen: React.FC = () => {
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [isTorchOn, setIsTorchOn] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [cameraRef, setCameraRef] = useState<Camera | null>(null);


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
      if (status !== 'granted') {
        Alert.alert("Permission Denied", "Camera permission is required to use the flashlight.");
      }
    })();
  }, []);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const toggleTool = async (tool: string) => {
    if (tool === 'Flashlight') {
      if (!hasCameraPermission) {
        Alert.alert("Permission Denied", "Camera permission is required to use the flashlight.");
        return;
      }
      const newTorchState = !isTorchOn;
      setIsTorchOn(!isTorchOn);
      // Torch.switchState(newTorchState)
        // .then(() => {
          // setIsTorchOn(newTorchState);
          // console.log(`Torch state changed: ${newTorchState}`);
        // })
        // .catch((error) => {
          // console.error(`Error switching torch state: ${error}`);
          // Alert.alert("Error", "Unable to switch torch state. Please try again.");
        // });
    }

    if (tool === 'Alarm Sound') {
      await playAlarmSound();
    }

    setSelectedTools(prevSelectedTools =>
      prevSelectedTools.includes(tool)
        ? prevSelectedTools.filter(t => t !== tool)
        : [...prevSelectedTools, tool]
    );
  };

  const playAlarmSound = async () => {
      // const asset = Asset.fromModule(require('../assets/alarm.mp3')); // Make sure the path is correct
      // await asset.downloadAsync();

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/alarm.mp3') // Ensure you have an alarm.mp3 file in your assets folder
    );
    alert("test");
    setSound(sound);
    await sound.playAsync();
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
