import { createContext, useState } from 'react';
import { calculateMatch } from '../utils/aiMatcher'; // ✅ AI matcher

export const ItemsContext = createContext();

export function ItemsProvider({ children }) {
  const [items, setItems] = useState([]);

  const addItem = (newItem) => {
    // Update existing items with AI match score
    const updatedItems = items.map((item) => ({
      ...item,
      matchScore: calculateMatch(item, newItem),
    }));

    // Add new item (matchScore = 0 for itself)
    setItems([
      { ...newItem, matchScore: 0 },
      ...updatedItems,
    ]);
  };

  return (
    <ItemsContext.Provider value={{ items, addItem }}>
      {children}
    </ItemsContext.Provider>
  );
}
