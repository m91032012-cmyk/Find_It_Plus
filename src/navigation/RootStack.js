import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import PhoneLoginScreen from '../screens/PhoneLoginScreen';
import OtpScreen from '../screens/OtpScreen';

import HomeScreen from '../screens/HomeScreen';
import ReportScreen from '../screens/ReportScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChatbotScreen from '../screens/ChatbotScreen';

const Stack = createNativeStackNavigator();

export default function RootStack() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Stack.Navigator>
      {!isLoggedIn ? (
        <>
          {/* 🔐 AUTH FLOW */}
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ title: 'Create Account' }}
          />

          <Stack.Screen
            name="PhoneLogin"
            component={PhoneLoginScreen}
            options={{ title: 'Phone Login' }}
          />

          <Stack.Screen
            name="Otp"
            component={OtpScreen}
            options={{ title: 'Verify OTP' }}
          />
        </>
      ) : (
        <>
          {/* ✅ APP FLOW */}
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'FindIt+' }}
          />

          <Stack.Screen
            name="Report"
            component={ReportScreen}
            options={{ title: 'Report Item' }}
          />

          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ title: 'Profile' }}
          />

          <Stack.Screen
            name="Chatbot"
            component={ChatbotScreen}
            options={{ title: 'AI Support' }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
