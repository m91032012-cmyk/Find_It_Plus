import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useContext, useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';

import { ItemsContext } from '../context/ItemsContext';
import { COLORS } from '../constants/theme';
import { notifyNewItem } from '../utils/notifications';
import { speak } from '../utils/voiceInput';

export default function ReportScreen({ navigation, route }) {
  const { addItem } = useContext(ItemsContext);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('LOST');
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);

  // 🌐 language: en | te | hi
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    if (route.params?.selectedLocation) {
      setLocation(route.params.selectedLocation);
    }
  }, [route.params?.selectedLocation]);

  // IMAGE PICKER
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.6,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // 🎤 VOICE ASSIST (AI)
  const startVoiceHelp = () => {
    if (language === 'te') {
      speak(
        'దయచేసి మీ వస్తువు వివరాలను మైక్ ద్వారా చెప్పండి. టైటిల్ మరియు వివరణను నింపండి.',
        'te'
      );
    } else if (language === 'hi') {
      speak(
        'कृपया माइक्रोफोन का उपयोग करके वस्तु का विवरण बोलें। शीर्षक और विवरण भरें।',
        'hi'
      );
    } else {
      speak(
        'Please speak the item details using the microphone. Fill title and description.',
        'en'
      );
    }
  };

  // SUBMIT
  const submitHandler = () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert(
        language === 'te'
          ? 'తప్పు'
          : language === 'hi'
          ? 'त्रुटि'
          : 'Error',
        language === 'te'
          ? 'దయచేసి అన్ని వివరాలు నింపండి'
          : language === 'hi'
          ? 'कृपया सभी विवरण भरें'
          : 'Please fill all fields'
      );
      return;
    }

    addItem({
      id: Date.now(),
      title,
      description,
      type,
      image,
      location,
    });

    notifyNewItem(title, type);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {language === 'te'
          ? 'వస్తువు నివేదించండి'
          : language === 'hi'
          ? 'वस्तु रिपोर्ट करें'
          : 'Report Item'}
      </Text>

      {/* 🌐 LANGUAGE SWITCH */}
      <View style={styles.langRow}>
        <TouchableOpacity onPress={() => setLanguage('en')}>
          <Text style={language === 'en' ? styles.langActive : styles.lang}>
            English
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setLanguage('te')}>
          <Text style={language === 'te' ? styles.langActive : styles.lang}>
            తెలుగు
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setLanguage('hi')}>
          <Text style={language === 'hi' ? styles.langActive : styles.lang}>
            हिंदी
          </Text>
        </TouchableOpacity>
      </View>

      {/* 🎤 VOICE BUTTON */}
      <TouchableOpacity style={styles.voiceBtn} onPress={startVoiceHelp}>
        <Text style={styles.voiceText}>
          🎤 {language === 'te'
            ? 'మాట్లాడండి'
            : language === 'hi'
            ? 'बोलें'
            : 'Speak'}
        </Text>
      </TouchableOpacity>

      {/* TITLE */}
      <TextInput
        placeholder={
          language === 'te'
            ? 'వస్తువు పేరు'
            : language === 'hi'
            ? 'वस्तु का नाम'
            : 'Item Title'
        }
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      {/* DESCRIPTION */}
      <TextInput
        placeholder={
          language === 'te'
            ? 'వివరణ'
            : language === 'hi'
            ? 'विवरण'
            : 'Description'
        }
        value={description}
        onChangeText={setDescription}
        style={[styles.input, { height: 90 }]}
        multiline
      />

      {/* TYPE */}
      <View style={styles.typeRow}>
        <TouchableOpacity
          style={[styles.typeBtn, type === 'LOST' && styles.lost]}
          onPress={() => setType('LOST')}
        >
          <Text style={styles.typeText}>
            {language === 'te'
              ? 'కనిపించలేదు'
              : language === 'hi'
              ? 'खोया'
              : 'LOST'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.typeBtn, type === 'FOUND' && styles.found]}
          onPress={() => setType('FOUND')}
        >
          <Text style={styles.typeText}>
            {language === 'te'
              ? 'కనిపించింది'
              : language === 'hi'
              ? 'मिला'
              : 'FOUND'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* IMAGE */}
      <TouchableOpacity style={styles.pickBtn} onPress={pickImage}>
        <Text>
          {language === 'te'
            ? 'చిత్రం ఎంచుకోండి'
            : language === 'hi'
            ? 'चित्र चुनें'
            : 'Pick Image'}
        </Text>
      </TouchableOpacity>

      {/* SUBMIT */}
      <TouchableOpacity style={styles.submitBtn} onPress={submitHandler}>
        <Text style={styles.submitText}>
          {language === 'te'
            ? 'సమర్పించండి'
            : language === 'hi'
            ? 'जमा करें'
            : 'Submit'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  typeRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  typeBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
  },
  lost: { backgroundColor: COLORS.lost },
  found: { backgroundColor: COLORS.found },
  typeText: { color: '#fff', fontWeight: 'bold' },
  pickBtn: {
    backgroundColor: '#CBD5E1',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  submitBtn: {
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitText: { color: '#fff', fontWeight: 'bold' },
  voiceBtn: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
  },
  voiceText: { color: '#fff', fontSize: 16 },
  langRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginBottom: 10,
  },
  lang: { color: '#64748B' },
  langActive: { color: '#000', fontWeight: 'bold' },
});
