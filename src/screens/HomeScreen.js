import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useContext, useState } from 'react';
import { ItemsContext } from '../context/ItemsContext';

export default function HomeScreen({ navigation }) {
  const { items } = useContext(ItemsContext);

  const [filter, setFilter] = useState('All'); // All | Lost | Found

  // 🔍 Filter logic
  const filteredItems =
    filter === 'All'
      ? items
      : items.filter((item) => item.type === filter);

  return (
    <View style={styles.container}>
      {/* 🔹 HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>FindIt+</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.profileText}>Profile</Text>
        </TouchableOpacity>
      </View>

      {/* 🤖 AI SUPPORT BUTTON */}
      <TouchableOpacity
        style={styles.chatbotBtn}
        onPress={() => navigation.navigate('Chatbot')}
      >
        <Text style={styles.chatbotText}>🤖 AI Support</Text>
      </TouchableOpacity>

      {/* 🔘 FILTER BUTTONS */}
      <View style={styles.filterRow}>
        <FilterBtn
          label="All"
          active={filter === 'All'}
          onPress={() => setFilter('All')}
        />
        <FilterBtn
          label="Lost"
          active={filter === 'Lost'}
          onPress={() => setFilter('Lost')}
        />
        <FilterBtn
          label="Found"
          active={filter === 'Found'}
          onPress={() => setFilter('Found')}
        />
      </View>

      {/* 📦 ITEMS LIST */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.empty}>No items found</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemDesc}>{item.description}</Text>

            <Text style={styles.typeText}>{item.type}</Text>

            {item.matchScore > 0 && (
              <Text style={styles.match}>
                AI Match: {item.matchScore}%
              </Text>
            )}
          </View>
        )}
      />

      {/* ➕ FLOATING ADD BUTTON */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('Report')}
      >
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>
    </View>
  );
}

/* =========================
   SMALL COMPONENTS
========================= */
const FilterBtn = ({ label, active, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.filterBtn,
      { backgroundColor: active ? '#4F46E5' : '#E5E7EB' },
    ]}
  >
    <Text style={{ color: active ? '#fff' : '#000' }}>{label}</Text>
  </TouchableOpacity>
);

/* =========================
   STYLES
========================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  profileText: {
    color: '#2563EB',
    fontWeight: 'bold',
  },

  chatbotBtn: {
    marginBottom: 12,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
  },

  chatbotText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  filterBtn: {
    flex: 1,
    marginHorizontal: 4,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },

  card: {
    backgroundColor: '#F1F5F9',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },

  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  itemDesc: {
    marginTop: 4,
    color: '#475569',
  },

  typeText: {
    marginTop: 4,
    fontWeight: 'bold',
    color: '#2563EB',
  },

  match: {
    marginTop: 6,
    color: '#16A34A',
    fontWeight: 'bold',
  },

  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: '#64748B',
  },

  /* ➕ FLOATING BUTTON */
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#16A34A',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },

  fabText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 2,
  },
});
