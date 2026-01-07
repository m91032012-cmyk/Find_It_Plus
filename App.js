import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';

import RootStack from './src/navigation/RootStack';
import { ItemsProvider } from './src/context/ItemsContext';
import { AuthProvider } from './src/context/AuthContext';
import { ThemeProvider } from './src/context/ThemeContext';
import { requestNotifyPermission } from './src/utils/notifications';

export default function App() {
  // 🔔 Ask notification permission safely
  useEffect(() => {
    requestNotifyPermission();
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <ItemsProvider>
          <NavigationContainer>
            <RootStack />
          </NavigationContainer>
        </ItemsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
