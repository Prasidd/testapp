'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface ThemeState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeState | undefined>(undefined);

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}

function Toolbar() {
  const { theme, toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>Switch to {theme === 'light' ? 'dark' : 'light'}</button>;
}

function Content() {
  const { theme } = useTheme();
  return <p>Current theme: {theme}</p>;
}

function StatusBadge() {
  const { theme } = useTheme();
  return <span style={{ color: theme === 'light' ? 'green' : 'gray' }}>● {theme}</span>;
}

export default function ThemeDemoPage() {
  return (
    <ThemeProvider>
      <div>
        <h1>Exercise 8a: Theme context</h1>
        <Toolbar />
        <Content />
        <StatusBadge />
      </div>
    </ThemeProvider>
  );
}