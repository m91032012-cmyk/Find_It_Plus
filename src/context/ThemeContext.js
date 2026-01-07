import { createContext, useState } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(true);

  const theme = dark
    ? { background: '#000', text: '#fff', card: '#111' }
    : { background: '#fff', text: '#000', card: '#f2f2f2' };

  return (
    <ThemeContext.Provider value={{ dark, setDark, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}
