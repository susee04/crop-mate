import React from 'react';
import { Sun, Moon, Volume2, VolumeX, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useMember } from '@/integrations';
import { useLanguageStore } from '@/stores/languageStore';
import { useThemeStore } from '@/stores/themeStore';
import { useSpeechStore } from '@/stores/speechStore';
import { LANGUAGES } from '@/lib/constants';

export const Header = () => {
  const { member, isAuthenticated, actions } = useMember();
  const { currentLanguage, setLanguage } = useLanguageStore();
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { isSpeaking, toggleSpeaking } = useSpeechStore();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-[120rem] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="text-2xl" aria-hidden="true">🌾</div>
            <h1 className="text-2xl font-heading font-bold text-primary">Crop Mate</h1>
          </Link>

          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <select
              value={currentLanguage}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-primary outline-none transition-shadow"
              aria-label="Select Language"
            >
              {LANGUAGES.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>

            {/* Theme Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="p-2"
              aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            {/* Speech Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleSpeaking}
              className="p-2"
              aria-label={isSpeaking ? "Turn off Voice Output" : "Turn on Voice Output"}
            >
              {isSpeaking ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>

            {/* Authentication */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Link to="/profile">
                  <Button variant="outline" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    {member?.profile?.nickname || member?.contact?.firstName || 'Profile'}
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={actions.logout}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Button
                  variant="default"
                  size="sm"
                  onClick={actions.login}
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
