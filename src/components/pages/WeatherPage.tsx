import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Thermometer, Droplets, Wind, Eye, Gauge, Sunrise, Sunset, CloudRain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useLanguageStore } from '@/stores/languageStore';
import { useThemeStore } from '@/stores/themeStore';

interface WeatherData {
  location: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  visibility: number;
  pressure: number;
  sunrise: string;
  sunset: string;
  uvIndex: number;
  feelsLike: number;
  forecast: {
    day: string;
    high: number;
    low: number;
    condition: string;
    icon: string;
    precipitation: number;
  }[];
}

const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState('Tamil Nadu, India');
  
  const { t } = useLanguageStore();
  const { isDarkMode } = useThemeStore();

  useEffect(() => {
    // Simulate fetching weather data
    setTimeout(() => {
      setWeatherData({
        location: 'Tamil Nadu, India',
        temperature: 28,
        humidity: 65,
        windSpeed: 12,
        condition: 'Partly Cloudy',
        visibility: 10,
        pressure: 1013,
        sunrise: '06:15',
        sunset: '18:30',
        uvIndex: 7,
        feelsLike: 32,
        forecast: [
          { day: 'Today', high: 30, low: 22, condition: 'Partly Cloudy', icon: '⛅', precipitation: 10 },
          { day: 'Tomorrow', high: 32, low: 24, condition: 'Sunny', icon: '☀️', precipitation: 0 },
          { day: 'Wednesday', high: 29, low: 21, condition: 'Rainy', icon: '🌧️', precipitation: 80 },
          { day: 'Thursday', high: 27, low: 20, condition: 'Cloudy', icon: '☁️', precipitation: 20 },
          { day: 'Friday', high: 31, low: 23, condition: 'Sunny', icon: '☀️', precipitation: 5 },
          { day: 'Saturday', high: 28, low: 22, condition: 'Partly Cloudy', icon: '⛅', precipitation: 15 },
          { day: 'Sunday', high: 26, low: 19, condition: 'Rainy', icon: '🌧️', precipitation: 70 },
        ]
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-background'}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="font-paragraph">{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-background'}`}>
        <div className="text-center">
          <p className="font-paragraph">{t('error')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-background text-foreground'}`}>
      <div className="max-w-[120rem] mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link to="/">
              <Button variant="outline" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t('home')}
              </Button>
            </Link>
            <h1 className="text-4xl font-heading font-bold text-primary">
              {t('weather')}
            </h1>
            <p className="font-paragraph text-gray-600 dark:text-gray-300 mt-2">
              {t('weatherDescription')}
            </p>
          </div>
          <div className="text-6xl">🌤️</div>
        </div>

        {/* Current Weather */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Card className="p-8 bg-gradient-to-br from-primary/10 to-primary/5">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <MapPin className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-heading font-semibold">{weatherData.location}</h2>
              </div>
              <div className="text-6xl">⛅</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-5xl font-bold text-primary mb-2">
                  {weatherData.temperature}°C
                </div>
                <p className="text-lg font-paragraph text-gray-600 dark:text-gray-300">
                  {weatherData.condition}
                </p>
                <p className="text-sm font-paragraph text-gray-500 dark:text-gray-400">
                  Feels like {weatherData.feelsLike}°C
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Droplets className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold">{weatherData.humidity}%</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{t('humidity')}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Wind className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold">{weatherData.windSpeed} km/h</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{t('windSpeed')}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Eye className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold">{weatherData.visibility} km</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Visibility</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Gauge className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold">{weatherData.pressure} hPa</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Pressure</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Sunrise className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold">{weatherData.sunrise}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Sunrise</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Sunset className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold">{weatherData.sunset}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Sunset</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* 7-Day Forecast */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-heading font-semibold mb-6">7-Day Forecast</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
            {weatherData.forecast.map((day, index) => (
              <Card key={index} className="p-4 text-center">
                <h3 className="font-semibold mb-2">{day.day}</h3>
                <div className="text-3xl mb-2">{day.icon}</div>
                <div className="space-y-1">
                  <p className="font-semibold">{day.high}°</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{day.low}°</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{day.condition}</p>
                  <div className="flex items-center justify-center space-x-1 text-xs">
                    <CloudRain className="h-3 w-3 text-blue-500" />
                    <span>{day.precipitation}%</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Agricultural Weather Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-heading font-semibold mb-6">Agricultural Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-heading font-semibold mb-3 text-primary">
                Irrigation Recommendation
              </h3>
              <p className="font-paragraph text-gray-600 dark:text-gray-300">
                Based on current humidity (65%) and upcoming rainfall, moderate irrigation is recommended for most crops. 
                Reduce watering for the next 2 days due to expected rain.
              </p>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-heading font-semibold mb-3 text-primary">
                Pest Alert
              </h3>
              <p className="font-paragraph text-gray-600 dark:text-gray-300">
                High humidity conditions may increase pest activity. Monitor crops closely for aphids and fungal diseases. 
                Consider preventive organic treatments.
              </p>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-heading font-semibold mb-3 text-primary">
                Planting Conditions
              </h3>
              <p className="font-paragraph text-gray-600 dark:text-gray-300">
                Current weather conditions are favorable for planting heat-tolerant crops. 
                Avoid planting sensitive seedlings until after Wednesday's rain.
              </p>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-heading font-semibold mb-3 text-primary">
                Harvesting Advisory
              </h3>
              <p className="font-paragraph text-gray-600 dark:text-gray-300">
                Good conditions for harvesting today and tomorrow. Plan to complete harvesting before Wednesday's rain. 
                Ensure proper drying conditions.
              </p>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-heading font-semibold mb-3 text-primary">
                UV Protection
              </h3>
              <p className="font-paragraph text-gray-600 dark:text-gray-300">
                UV Index is high (7). Protect sensitive crops with shade cloth during peak hours (11 AM - 3 PM). 
                Ensure adequate hydration for livestock.
              </p>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-heading font-semibold mb-3 text-primary">
                Wind Advisory
              </h3>
              <p className="font-paragraph text-gray-600 dark:text-gray-300">
                Moderate wind speeds (12 km/h) are suitable for most farming activities. 
                Good conditions for natural pollination and pesticide application.
              </p>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WeatherPage;