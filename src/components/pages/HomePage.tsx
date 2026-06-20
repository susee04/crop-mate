import React, { useState } from 'react';
import { motion, useTransform, useViewportScroll } from 'framer-motion';
import { Mic, MicOff, MapPin, Thermometer, Droplets, Wind } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Link } from 'react-router-dom';
import { useLanguageStore } from '@/stores/languageStore';
import { useSpeechStore } from '@/stores/speechStore';

const HomePage = () => {
  const { scrollY } = useViewportScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]);
  
  const { t } = useLanguageStore();
  const { isListening, startListening, stopListening } = useSpeechStore();
  
  const [currentWeather, setCurrentWeather] = useState({
    temperature: 28,
    humidity: 65,
    windSpeed: 12,
    condition: 'Partly Cloudy',
    location: 'Tamil Nadu, India'
  });

  const categories = [
    {
      title: t('crops'),
      icon: '🌾',
      description: t('cropDescription'),
      link: '/crops',
      color: 'bg-light-green'
    },
    {
      title: t('pests'),
      icon: '🐛',
      description: t('pestDescription'),
      link: '/pests',
      color: 'bg-secondary'
    },
    {
      title: t('soil'),
      icon: '🌱',
      description: t('soilDescription'),
      link: '/soil',
      color: 'bg-beige'
    },
    {
      title: t('weather'),
      icon: '🌤️',
      description: t('weatherDescription'),
      link: '/weather',
      color: 'bg-soft-gold'
    },
    {
      title: t('schemes'),
      icon: '🏛️',
      description: t('schemesDescription'),
      link: '/schemes',
      color: 'bg-light-green'
    },
    {
      title: t('market'),
      icon: '📈',
      description: t('marketDescription'),
      link: '/market',
      color: 'bg-secondary'
    },
    {
      title: t('pesticides'),
      icon: '🧪',
      description: t('pesticidesDescription'),
      link: '/pesticides',
      color: 'bg-beige'
    },
    {
      title: t('water'),
      icon: '💧',
      description: t('waterDescription'),
      link: '/water',
      color: 'bg-soft-gold'
    },
    {
      title: t('diseaseDetection'),
      icon: '🔍',
      description: t('diseaseDescription'),
      link: '/disease-detection',
      color: 'bg-light-green'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center p-8 relative overflow-hidden">
        <motion.div 
          style={{ y }}
          className="text-center z-10 max-w-6xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <Image
              src="https://static.wixstatic.com/media/7cdd40_0e78ff9a700c4e04a491df78c54b26c1~mv2.png?originWidth=768&originHeight=576"
              alt="Farm illustration with crops and farmers"
              className="w-full max-w-3xl mx-auto mb-8 h-auto"
              width={600}
            />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-center text-dark-green mb-6"
          >
            {t('heroTitle')}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl font-paragraph text-center text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            {t('heroSubtitle')}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-8"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={isListening ? stopListening : startListening}
              className={`rounded-full p-6 shadow-lg transition-all duration-300 ${
                isListening 
                  ? 'bg-destructive hover:bg-destructive/90 text-destructive-foreground' 
                  : 'bg-primary hover:bg-primary/90 text-primary-foreground'
              }`}
            >
              {isListening ? (
                <MicOff className="h-8 w-8" />
              ) : (
                <Mic className="h-8 w-8" />
              )}
            </motion.button>
            <p className="mt-4 text-sm font-paragraph text-gray-600 dark:text-gray-300">
              {isListening ? t('listening') : t('tapToSpeak')}
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Weather Widget */}
      <section className="py-16 px-6">
        <div className="max-w-[120rem] mx-auto">
          <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-heading font-semibold flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                {t('currentWeather')}
              </h2>
              <span className="text-sm text-gray-600 dark:text-gray-300">{currentWeather.location}</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex items-center space-x-3">
                <Thermometer className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{currentWeather.temperature}°C</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{t('temperature')}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Droplets className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{currentWeather.humidity}%</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{t('humidity')}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Wind className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{currentWeather.windSpeed} km/h</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{t('windSpeed')}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="text-2xl">🌤️</div>
                <div>
                  <p className="text-lg font-semibold">{currentWeather.condition}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{t('condition')}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 px-6">
        <div className="max-w-[120rem] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-heading font-bold text-center mb-12 text-dark-green"
          >
            {t('exploreCategories')}
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link to={category.link}>
                  <Card className={`p-6 h-full transition-all duration-300 hover:shadow-lg hover:scale-105 ${category.color} border-0`}>
                    <div className="text-center">
                      <div className="text-4xl mb-4">{category.icon}</div>
                      <h3 className="text-xl font-heading font-semibold mb-2 text-dark-green">
                        {category.title}
                      </h3>
                      <p className="text-sm font-paragraph text-gray-700">
                        {category.description}
                      </p>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Assistant Section */}
      <section className="py-16 px-6 bg-light-green/20 dark:bg-gray-800/50">
        <div className="max-w-[120rem] mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-heading font-bold mb-8 text-dark-green"
          >
            {t('aiAssistant')}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl font-paragraph text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            {t('aiDescription')}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              {t('askQuestion')}
            </Button>
            <Button size="lg" variant="outline">
              {t('learnMore')}
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HomePage;