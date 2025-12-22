import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useContext, useState } from 'react';
import { ItemsContext } from '../context/ItemsContext';
import ItemCard from '../components/ItemCard';
import ScreenWrapper from '../components/ScreenWrapper';
import { COLORS } from '../constants/theme';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { items } = useContext(ItemsContext);

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('ALL');

  const filteredItems = items.filter((item) => {
    const matchSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchFilter =
      filter === 'ALL' ? true : item.type === filter;
    return matchSearch && matchFilter;
  });

  return (
    <ScreenWrapper>
      <SafeAreaView style={styles.safe}>
        {/* HEADER + BADGE */}
        <View style={styles.header}>
          <Text style={styles.projectName}>FindIt+</Text>
          <View style={styles.badgeWrap}>
            <Text style={styles.badgeText}>{items.length}</Text>
          </View>
        </View>

        {/* SEARCH */}
        <TextInput
          placeholder="Search items..."
          style={styles.search}
          value={search}
          onChangeText={setSearch}
        />

        {/* FILTERS */}
        <View style={styles.filterRow}>
          {['ALL', 'LOST', 'FOUND'].map((f) => (
            <TouchableOpacity
              key={f}
              style={[
                styles.filterBtn,
                filter === f && styles.filterActive,
              ]}
              onPress={() => setFilter(f)}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === f && styles.filterTextActive,
                ]}
              >
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* LIST */}
        <ScrollView contentContainerStyle={styles.content}>
          {filteredItems.length === 0 && (
            <Text style={styles.emptyText}>No items found</Text>
          )}

          {filteredItems.map((item) => (
            <ItemCard
              key={item.id}
              title={item.title}
              desc={item.desc}
              status={item.type}
            />
          ))}
        </ScrollView>

        {/* FAB */}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('Report')}
        >
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },

  header: {
    backgroundColor: COLORS.primary,
    paddingVertical: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
  },
  projectName: { color: '#fff', fontSize: 28, fontWeight: '800' },

  badgeWrap: {
    position: 'absolute',
    right: 20,
    top: 30,
    backgroundColor: '#EF4444',
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { color: '#fff', fontWeight: '700', fontSize: 12 },

  search: {
    backgroundColor: COLORS.white,
    margin: 16,
    padding: 14,
    borderRadius: 18,
  },

  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  filterBtn: {
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 25,
    backgroundColor: '#E5E7EB',
  },
  filterActive: { backgroundColor: COLORS.primary },
  filterText: { fontWeight: '700' },
  filterTextActive: { color: '#fff' },

  content: { padding: 20, paddingBottom: 120 },
  emptyText: { textAlign: 'center', color: COLORS.muted },

  fab: {
    position: 'absolute',
    bottom: 28,
    right: 28,
    backgroundColor: COLORS.secondary,
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabText: { color: '#fff', fontSize: 34 },
});
