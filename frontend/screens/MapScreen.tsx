import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import commonStyles from './commonStyles';

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState({
    latitude: 32.0853,
    longitude: 34.7818,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      console.log(`location: `, loc);
      setLocation(loc.coords);
      setRegion({
        ...region,
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
    })();
  }, []);

  return (
    <SafeAreaView style={commonStyles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-left" size={24} color="#fff" />
      </TouchableOpacity>
      <MapView style={styles.map} region={region}>
        {location && (
          <>
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title=" Adi"
            />
            <Marker
              coordinate={{
                latitude: location.latitude + 0.002,
                longitude: location.longitude + 0.002,
              }}
              title="Omer"
            />
          </>
        )}
      </MapView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  backButton: {
    position: 'absolute',
    top: 40, // Adjust based on your layout
    left: 20,
    zIndex: 1, // Ensure button is above the map
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 10,
  },
});

export default MapScreen;
