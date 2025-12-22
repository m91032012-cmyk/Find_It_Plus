import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ItemDetailsScreen from '../screens/ItemDetailsScreen';
import ReportScreen from '../screens/ReportScreen';
import MapPickerScreen from '../screens/MapPickerScreen';

const Stack = createNativeStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={ItemDetailsScreen} />
      <Stack.Screen name="Report" component={ReportScreen} />
      <Stack.Screen name="MapPicker" component={MapPickerScreen} />
    </Stack.Navigator>
  );
}
