import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import commonStyles from './commonStyles';

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

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
                latitude: location.latitude + 0.002, // Fixed offset for demonstration
                longitude: location.longitude + 0.002, // Fixed offset for demonstration
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
  greenBox: {
    width: 100,
    height: 100,
    backgroundColor: 'green',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

export default MapScreen;
