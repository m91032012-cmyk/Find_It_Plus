import { NavigationContainer } from '@react-navigation/native';
import RootStack from './navigation/RootStack';
import { ItemsProvider } from './context/ItemsContext';

export default function App() {
  return (
    <ItemsProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </ItemsProvider>
  );
}
