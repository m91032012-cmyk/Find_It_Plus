import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useContext, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <LinearGradient
      colors={['#020617', '#020617', '#0F172A']}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.title}>FindIt+</Text>
        <Text style={styles.subtitle}>
          AI-Powered Lost & Found Platform
        </Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#CBD5E1"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#CBD5E1"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        {/* 🔐 EMAIL LOGIN */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (!email || !password) return;
            login();
          }}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* 📱 PHONE LOGIN (ADDED – SAFE) */}
        <TouchableOpacity
          onPress={() => navigation.navigate('PhoneLogin')}
        >
          <Text style={styles.phoneText}>
            Login with Phone Number
          </Text>
        </TouchableOpacity>

        {/* 🆕 REGISTER */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.registerText}>
            New user? Create an account
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

/* =========================
   STYLES
========================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    width: '85%',
    padding: 28,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#E0E7FF',
    textAlign: 'center',
  },

  subtitle: {
    color: '#CBD5E1',
    textAlign: 'center',
    marginBottom: 24,
    fontSize: 13,
  },

  input: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    color: '#fff',
  },

  button: {
    backgroundColor: '#4F46E5',
    padding: 14,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 6,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  phoneText: {
    marginTop: 14,
    textAlign: 'center',
    color: '#16A34A',
    fontWeight: 'bold',
  },

  registerText: {
    marginTop: 16,
    textAlign: 'center',
    color: '#2563EB',
    fontWeight: 'bold',
  },
});
