import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useState } from 'react';
import * as Speech from 'expo-speech';

export default function ChatbotScreen() {
  const [messages, setMessages] = useState([
    {
      id: '1',
      from: 'bot',
      text: 'Hello 👋 I am FindIt AI. How can I help you?',
      lang: 'en-US',
    },
  ]);

  const [input, setInput] = useState('');
  const [lang, setLang] = useState('en-US'); // en-US | te-IN | hi-IN

  const speak = (text, language) => {
    Speech.speak(text, { language });
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      from: 'user',
      text: input,
    };

    const botText = getBotReply(input);
    const botMsg = {
      id: (Date.now() + 1).toString(),
      from: 'bot',
      text: botText,
      lang,
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    speak(botText, lang);
    setInput('');
  };

  const getBotReply = (text) => {
    const msg = text.toLowerCase();

    if (msg.includes('lost')) {
      return lang === 'te-IN'
        ? 'మీరు వస్తువు కోల్పోతే, హోమ్ స్క్రీన్‌లో ప్లస్ బటన్ నొక్కి నివేదించండి.'
        : lang === 'hi-IN'
        ? 'यदि आपने कोई वस्तु खो दी है, तो होम स्क्रीन पर प्लस बटन दबाकर रिपोर्ट करें।'
        : 'If you lost an item, tap the plus button on Home to report it.';
    }

    if (msg.includes('found')) {
      return lang === 'te-IN'
        ? 'మీరు దొరికిన వస్తువును నివేదించవచ్చు.'
        : lang === 'hi-IN'
        ? 'आप मिली हुई वस्तु की रिपोर्ट कर सकते हैं।'
        : 'You can report a found item using the report option.';
    }

    if (msg.includes('login')) {
      return lang === 'te-IN'
        ? 'మీరు ఈమెయిల్ లేదా ఫోన్ OTP ద్వారా లాగిన్ అవ్వవచ్చు.'
        : lang === 'hi-IN'
        ? 'आप ईमेल या फोन ओटीपी से लॉगिन कर सकते हैं।'
        : 'You can login using email or phone number with OTP.';
    }

    return lang === 'te-IN'
      ? 'క్షమించండి, నాకు అర్థం కాలేదు.'
      : lang === 'hi-IN'
      ? 'मुझे समझ नहीं आया।'
      : 'Sorry, I did not understand. Try lost, found, or login.';
  };

  return (
    <View style={styles.container}>
      {/* 🌐 LANGUAGE SWITCH */}
      <View style={styles.langRow}>
        <LangBtn label="EN" onPress={() => setLang('en-US')} />
        <LangBtn label="TE" onPress={() => setLang('te-IN')} />
        <LangBtn label="HI" onPress={() => setLang('hi-IN')} />
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.msg,
              item.from === 'user'
                ? styles.userMsg
                : styles.botMsg,
            ]}
          >
            <Text>{item.text}</Text>
          </View>
        )}
      />

      <View style={styles.inputRow}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type your message..."
          style={styles.input}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Text style={{ color: '#fff' }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* =========================
   SMALL COMPONENTS
========================= */
const LangBtn = ({ label, onPress }) => (
  <TouchableOpacity style={styles.langBtn} onPress={onPress}>
    <Text>{label}</Text>
  </TouchableOpacity>
);

/* =========================
   STYLES
========================= */
const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  langRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  langBtn: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#E5E7EB',
  },
  msg: {
    maxWidth: '75%',
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
  },
  userMsg: {
    backgroundColor: '#4F46E5',
    alignSelf: 'flex-end',
  },
  botMsg: {
    backgroundColor: '#E5E7EB',
    alignSelf: 'flex-start',
  },
  inputRow: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    padding: 10,
  },
  sendBtn: {
    backgroundColor: '#4F46E5',
    padding: 12,
    marginLeft: 6,
    borderRadius: 8,
  },
});
