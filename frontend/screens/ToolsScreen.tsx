import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import Torch from 'react-native-torch';
import * as Permissions from 'expo-permissions';
import { Audio } from 'expo-av';
import { Camera } from 'expo-camera';
import * as Asset from 'expo-asset';


const ToolsScreen = () => {
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
