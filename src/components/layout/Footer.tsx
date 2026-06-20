import React from 'react';
import { useLanguageStore } from '@/stores/languageStore';
import { LANGUAGES } from '@/lib/constants';

export const Footer = () => {
  const { currentLanguage, setLanguage, t } = useLanguageStore();

  const handleLanguageChange = (code: string) => {
    setLanguage(code);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-dark-green text-white py-12 px-6">
      <div className="max-w-[120rem] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="text-2xl" aria-hidden="true">🌾</div>
              <h3 className="text-xl font-heading font-bold">Crop Mate</h3>
            </div>
            <p className="font-paragraph text-gray-300">
              {t('footerDescription')}
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">{t('features')}</h4>
            <ul className="space-y-2 font-paragraph text-gray-300">
              <li>{t('voiceAssistant')}</li>
              <li>{t('cropGuidance')}</li>
              <li>{t('pestManagement')}</li>
              <li>{t('weatherUpdates')}</li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">{t('support')}</h4>
            <ul className="space-y-2 font-paragraph text-gray-300">
              <li>{t('helpCenter')}</li>
              <li>{t('tutorials')}</li>
              <li>{t('contact')}</li>
              <li>{t('feedback')}</li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">{t('languages')}</h4>
            <div className="grid grid-cols-2 gap-2">
              {LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`text-left p-2 rounded transition-all ${
                    currentLanguage === lang.code
                      ? 'bg-primary text-white shadow-md'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                  aria-pressed={currentLanguage === lang.code}
                >
                  {lang.flag} {lang.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="font-paragraph text-gray-300">
            © {new Date().getFullYear()} Crop Mate. {t('allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
};
