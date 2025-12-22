import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useState } from 'react';

export default function MapPickerScreen({ navigation }) {
  const [picked, setPicked] = useState(null);

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: 20.5937,
          longitude: 78.9629,
          latitudeDelta: 10,
          longitudeDelta: 10,
        }}
        onPress={(e) => setPicked(e.nativeEvent.coordinate)}
      >
        {picked && <Marker coordinate={picked} />}
      </MapView>

      {picked && (
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('Report', { picked })}
        >
          <Text style={styles.btnText}>Use This Location</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  btn: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: '#4F46E5',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontWeight: '700' },
});
