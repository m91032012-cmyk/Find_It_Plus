import { createContext, useState } from 'react';

export const ItemsContext = createContext();

export function ItemsProvider({ children }) {
  const [items, setItems] = useState([]);

  const addItem = (item) => {
    setItems((prev) => [item, ...prev]);
  };

  // 🔍 AUTO MATCHING (SAFE)
  const findMatches = (currentItem) => {
    return items.filter(
      (item) =>
        item.id !== currentItem.id &&
        item.type !== currentItem.type &&
        item.title
          .toLowerCase()
          .includes(currentItem.title.toLowerCase())
    );
  };

  return (
    <ItemsContext.Provider value={{ items, addItem, findMatches }}>
      {children}
    </ItemsContext.Provider>
  );
}
