import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';
import { useContext, useState, useEffect } from 'react';
import { ItemsContext } from '../context/ItemsContext';
import ScreenWrapper from '../components/ScreenWrapper';
import { COLORS } from '../constants/theme';

export default function ReportScreen({ navigation, route }) {
  const { addItem } = useContext(ItemsContext);

  const [type, setType] = useState('LOST');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    if (route.params?.picked) {
      const { latitude, longitude } = route.params.picked;
      setLocation(`Lat ${latitude.toFixed(3)}, Lng ${longitude.toFixed(3)}`);
    }
  }, [route.params]);

  const submit = () => {
    if (!title || !desc || !location) {
      Alert.alert('Error', 'Fill all fields');
      return;
    }

    addItem({
      id: Date.now().toString(),
      type,
      title,
      desc,
      location,
    });

    navigation.goBack();
  };

  return (
    <ScreenWrapper>
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.heading}>Report Item</Text>

          <View style={styles.toggleRow}>
            {['LOST', 'FOUND'].map((t) => (
              <TouchableOpacity
                key={t}
                style={[
                  styles.toggle,
                  type === t &&
                    (t === 'LOST'
                      ? styles.activeLost
                      : styles.activeFound),
                ]}
                onPress={() => setType(t)}
              >
                <Text style={styles.toggleText}>{t}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            placeholder="Item Name"
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            placeholder="Description"
            style={[styles.input, styles.textArea]}
            value={desc}
            onChangeText={setDesc}
            multiline
          />

          <TextInput
            placeholder="Location"
            style={styles.input}
            value={location}
            onChangeText={setLocation}
          />

          <TouchableOpacity
            style={styles.locBtn}
            onPress={() => navigation.navigate('MapPicker')}
          >
            <Text style={styles.locText}>Pick From Map</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={submit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  container: { padding: 20 },
  heading: { fontSize: 26, fontWeight: '800', marginBottom: 20 },

  toggleRow: { flexDirection: 'row', marginBottom: 20 },
  toggle: {
    flex: 1,
    padding: 14,
    marginHorizontal: 5,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
  },
  toggleText: { fontWeight: '700' },
  activeLost: { backgroundColor: COLORS.primary },
  activeFound: { backgroundColor: COLORS.secondary },

  input: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 14,
    marginBottom: 16,
  },
  textArea: { height: 90 },

  locBtn: {
    backgroundColor: '#E0E7FF',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  locText: { fontWeight: '700', color: COLORS.primary },

  button: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '700' },
});
