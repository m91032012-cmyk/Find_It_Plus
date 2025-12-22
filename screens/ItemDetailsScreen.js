import { View, Text, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { ItemsContext } from '../context/ItemsContext';
import { COLORS } from '../constants/theme';

export default function ItemDetailsScreen({ route }) {
  const { title, desc, status, id } = route.params;
  const { findMatches } = useContext(ItemsContext);

  const matches = findMatches({ id, title, type: status });

  return (
    <View style={styles.container}>
      <Text style={[styles.badge, status === 'FOUND' && styles.found]}>
        {status}
      </Text>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.desc}>{desc}</Text>

      {matches.length > 0 && (
        <View style={styles.matchBox}>
          <Text style={styles.matchTitle}>Possible Matches</Text>
          {matches.map((item) => (
            <Text key={item.id} style={styles.matchItem}>
              • {item.title} ({item.type})
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, backgroundColor: COLORS.background },
  badge: {
    backgroundColor: COLORS.primary,
    color: '#fff',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'flex-start',
    fontWeight: '700',
  },
  found: { backgroundColor: COLORS.secondary },
  title: { fontSize: 26, fontWeight: '800', marginTop: 20 },
  desc: { marginTop: 10, color: COLORS.muted },

  matchBox: {
    marginTop: 30,
    padding: 16,
    backgroundColor: '#EEF2FF',
    borderRadius: 14,
  },
  matchTitle: {
    fontWeight: '700',
    marginBottom: 6,
  },
  matchItem: {
    color: COLORS.text,
    marginTop: 4,
  },
});
