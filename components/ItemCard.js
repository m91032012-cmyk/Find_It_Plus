import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants/theme';
import { useRef, useEffect } from 'react';

export default function ItemCard({ title, desc, status }) {
  const navigation = useNavigation();

  const scale = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Details', {
          title,
          desc,
          status,
        })
      }
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        <View style={styles.card}>
          <Text
            style={[
              styles.badge,
              status === 'FOUND' && styles.found,
            ]}
          >
            {status}
          </Text>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.desc}>{desc}</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    padding: 18,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 4,
  },
  badge: {
    backgroundColor: COLORS.primary,
    color: '#fff',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 12,
    fontWeight: '700',
  },
  found: {
    backgroundColor: COLORS.secondary,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 6,
    color: COLORS.text,
  },
  desc: {
    marginTop: 4,
    color: COLORS.muted,
  },
});
