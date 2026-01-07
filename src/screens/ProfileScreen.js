import { View, Text, Switch, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function ProfileScreen() {
  const { dark, setDark, theme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>
        Dark Mode
      </Text>

      <Switch value={dark} onValueChange={setDark} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 12,
  },
});
