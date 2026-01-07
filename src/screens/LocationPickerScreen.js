import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export default function LocationPickerScreen({ navigation }) {
  const [region, setRegion] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      const loc = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  if (!region) return null;

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFill}
        region={region}
        onPress={(e) => setMarker(e.nativeEvent.coordinate)}
      >
        {marker && <Marker coordinate={marker} />}
      </MapView>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          // ✅ PASS ONLY DATA (NO FUNCTIONS)
          navigation.navigate('Report', {
            selectedLocation: marker,
          });
        }}
      >
        <Text style={styles.btnText}>Confirm Location</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  btn: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#4F46E5',
    padding: 14,
    borderRadius: 12,
  },
  btnText: { color: '#fff', fontWeight: 'bold' },
});
