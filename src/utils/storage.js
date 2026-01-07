import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'FINDIT_ITEMS';

export const saveItems = async (items) => {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(items));
  } catch (e) {
    console.log('Save error', e);
  }
};

export const loadItems = async () => {
  try {
    const data = await AsyncStorage.getItem(KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.log('Load error', e);
    return [];
  }
};
