import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import InfoScreen from './InfoScreen'; // Import the InfoScreen component

// Define the type for a group
interface Group {
  id: string;
  name: string;
  members: number; // Add a field for the number of members
}

// Sample data for groups
const groups: Group[] = [
  { id: '1', name: 'Family', members: 5 },
  { id: '2', name: 'Friends', members: 2 },
  { id: '3', name: 'Work', members: 500 },
  { id: '4', name: 'Kibutz', members: 121 },
  // Add more groups as needed
];

const MainPage: React.FC = () => {
  const showSOSAlert = () => {
    Alert.alert(
      'Are you sure?',
      'Activate Emergency Button',
      [
        {
          text: 'No',
          onPress: () => console.log('SOS Cancelled'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => console.log('SOS Activated'),
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  const [showInfoScreen, setShowInfoScreen] = useState(false);

  if (showInfoScreen) {
    return <InfoScreen onGoBack={() => setShowInfoScreen(false)} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headlineContainer}>
        <Text style={styles.headline}>My Groups</Text>
        <TouchableOpacity style={styles.plusButton} onPress={() => { /* Handle adding a group */ }}>
          <Icon name="plus" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={groups}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.groupItem}>
            <Text style={styles.groupName}>{item.name}</Text>
            <View style={styles.iconsContainer}>
              {item.members > 3 && (
                <Text style={styles.plusIcon}>+{item.members - 3}</Text>
              )}
              {item.members > 10 ? (
                <Icon name="group" size={30} color="#000" style={styles.groupIcon} />
              ) : (
                [...Array(Math.min(item.members, 3))].map((_, index) => (
                  <Icon key={index} name="user" size={30} color="#000" style={styles.groupIcon} />
                ))
              )}
            </View>
          </View>
        )}
      />
      <View style={styles.toolbar}>
        <View style={styles.leftToolbarButtonGroup}>
          <TouchableOpacity style={styles.toolbarButton}>
            <View style={styles.mapContainer}>
              <Icon name="map" size={25} color="#4CAF50" />
              <Text style={styles.toolbarButtonText}>Map</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.sosButton} onPress={showSOSAlert}>
          <Text style={styles.sosButtonText}>SOS</Text>
        </TouchableOpacity>
        <View style={styles.rightToolbarButtonGroup}>
          <TouchableOpacity style={styles.toolbarButton} onPress={() => setShowInfoScreen(true)}>
            <Icon name="info-circle" size={30} color="#4CAF50" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolbarButton}>
            <Icon name="user" size={30} color="#4CAF50" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#55B55C', // New green color
    padding: 10,
    marginBottom: 10,
    marginTop: 50, // Adjust this value to move the background lower
    borderRadius: 20, // Rounded corners
  },
  headline: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1, // Take up all available space
  },
  plusButton: {
    padding: 10,
  },
  groupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    justifyContent: 'space-between',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupIcon: {
    marginLeft: 5,
  },
  plusIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 5,
  },
  groupName: {
    fontSize: 20,
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 90,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#e8f5e9', // Light green background
    position: 'absolute',
    bottom: 5,
    left: 0,
    right: 0,
    paddingHorizontal: 25, // Ensure padding on sides
    justifyContent: 'space-between', // Distribute space evenly
  },
  leftToolbarButtonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightToolbarButtonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toolbarButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  toolbarButtonText: {
    fontSize: 18,
    marginLeft: 15, // Space between icon and text
  },
  mapContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sosButton: {
    backgroundColor: 'red',
    borderRadius: 1000, // Perfect circle
    width: 125, // Increase size
    height: 125, // Increase size
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -40 }, { translateY: -90 }], // Center in the middle
    elevation: 100, // Add shadow for better visibility
  },
  sosButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default MainPage;
