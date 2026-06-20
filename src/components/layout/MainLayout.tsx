import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { Chatbot } from '@/components/ui/chatbot';
import { useThemeStore } from '@/stores/themeStore';

export const MainLayout = () => {
  const { isDarkMode } = useThemeStore();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-background text-foreground'}`}>
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};
