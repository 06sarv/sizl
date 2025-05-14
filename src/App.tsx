import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';
import Dashboard from './components/Dashboard';

const queryClient = new QueryClient();

function App() {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ko' : 'en';
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        theme={{
          colorScheme: 'light',
          primaryColor: 'blue',
        }}
      >
        <Dashboard onLanguageToggle={toggleLanguage} currentLanguage={language} />
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
