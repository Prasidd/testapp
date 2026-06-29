'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageState {
  lang: 'en' | 'np';
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageState | undefined>(undefined);

function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<'en' | 'np'>('en');
  const toggleLang = () => setLang(prev => (prev === 'en' ? 'np' : 'en'));

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}

function LangSwitcher() {
  const { lang, toggleLang } = useLanguage();
  return <button onClick={toggleLang}>Switch to {lang === 'en' ? 'np' : 'en'}</button>;
}

function Greeting() {
  const { lang } = useLanguage();
  return <p>{lang === 'en' ? 'Hello!' : 'Namaste!'}</p>;
}

function FooterNote() {
  const { lang } = useLanguage();
  return <footer>Language: {lang}</footer>;
}

export default function LanguageDemoPage() {
  return (
    <LanguageProvider>
      <div>
        <h1>Exercise 8b: Language context</h1>
        <LangSwitcher />
        <Greeting />
        <FooterNote />
      </div>
    </LanguageProvider>
  );
}