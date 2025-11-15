import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, TrendingDown, BarChart3, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useLanguageStore } from '@/stores/languageStore';
import { useThemeStore } from '@/stores/themeStore';

interface MarketData {
  crop: string;
  currentPrice: number;
  previousPrice: number;
  trend: 'up' | 'down' | 'stable';
  demand: 'high' | 'medium' | 'low';
  season: string;
  location: string;
  priceHistory: { month: string; price: number }[];
}

interface MarketInsight {
  title: string;
  description: string;
  impact: 'positive' | 'negative' | 'neutral';
  crops: string[];
}

const MarketPage = () => {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [insights, setInsights] = useState<MarketInsight[]>([]);
  const [selectedCrop, setSelectedCrop] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);
  
  const { t } = useLanguageStore();
  const { isDarkMode } = useThemeStore();

  useEffect(() => {
    // Simulate fetching market data
    setTimeout(() => {
      setMarketData([
        {
          crop: 'Rice',
          currentPrice: 2850,
          previousPrice: 2750,
          trend: 'up',
          demand: 'high',
          season: 'Kharif',
          location: 'Tamil Nadu',
          priceHistory: [
            { month: 'Jan', price: 2600 },
            { month: 'Feb', price: 2650 },
            { month: 'Mar', price: 2700 },
            { month: 'Apr', price: 2750 },
            { month: 'May', price: 2800 },
            { month: 'Jun', price: 2850 },
          ]
        },
        {
          crop: 'Wheat',
          currentPrice: 2200,
          previousPrice: 2300,
          trend: 'down',
          demand: 'medium',
          season: 'Rabi',
          location: 'Punjab',
          priceHistory: [
            { month: 'Jan', price: 2400 },
            { month: 'Feb', price: 2350 },
            { month: 'Mar', price: 2300 },
            { month: 'Apr', price: 2250 },
            { month: 'May', price: 2200 },
            { month: 'Jun', price: 2200 },
          ]
        },
        {
          crop: 'Sugarcane',
          currentPrice: 350,
          previousPrice: 340,
          trend: 'up',
          demand: 'high',
          season: 'Year-round',
          location: 'Maharashtra',
          priceHistory: [
            { month: 'Jan', price: 320 },
            { month: 'Feb', price: 325 },
            { month: 'Mar', price: 330 },
            { month: 'Apr', price: 340 },
            { month: 'May', price: 345 },
            { month: 'Jun', price: 350 },
          ]
        },
        {
          crop: 'Cotton',
          currentPrice: 5800,
          previousPrice: 5900,
          trend: 'down',
          demand: 'medium',
          season: 'Kharif',
          location: 'Gujarat',
          priceHistory: [
            { month: 'Jan', price: 6000 },
            { month: 'Feb', price: 5950 },
            { month: 'Mar', price: 5900 },
            { month: 'Apr', price: 5850 },
            { month: 'May', price: 5800 },
            { month: 'Jun', price: 5800 },
          ]
        },
        {
          crop: 'Maize',
          currentPrice: 1850,
          previousPrice: 1800,
          trend: 'up',
          demand: 'high',
          season: 'Kharif',
          location: 'Karnataka',
          priceHistory: [
            { month: 'Jan', price: 1700 },
            { month: 'Feb', price: 1750 },
            { month: 'Mar', price: 1780 },
            { month: 'Apr', price: 1800 },
            { month: 'May', price: 1820 },
            { month: 'Jun', price: 1850 },
          ]
        },
        {
          crop: 'Soybean',
          currentPrice: 4200,
          previousPrice: 4200,
          trend: 'stable',
          demand: 'medium',
          season: 'Kharif',
          location: 'Madhya Pradesh',
          priceHistory: [
            { month: 'Jan', price: 4100 },
            { month: 'Feb', price: 4150 },
            { month: 'Mar', price: 4200 },
            { month: 'Apr', price: 4200 },
            { month: 'May', price: 4200 },
            { month: 'Jun', price: 4200 },
          ]
        }
      ]);

      setInsights([
        {
          title: 'Monsoon Impact on Rice Prices',
          description: 'Early monsoon arrival has increased rice demand and prices. Expect continued upward trend through July.',
          impact: 'positive',
          crops: ['Rice', 'Sugarcane']
        },
        {
          title: 'Global Wheat Market Pressure',
          description: 'International wheat prices are affecting domestic markets. Consider alternative crops for better returns.',
          impact: 'negative',
          crops: ['Wheat']
        },
        {
          title: 'Cotton Export Opportunities',
          description: 'Despite recent price decline, export demand for cotton remains strong. Quality cotton may fetch premium prices.',
          impact: 'neutral',
          crops: ['Cotton']
        },
        {
          title: 'Maize Demand Surge',
          description: 'Increased demand from poultry and ethanol industries is driving maize prices up. Good time to sell.',
          impact: 'positive',
          crops: ['Maize']
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <BarChart3 className="h-4 w-4 text-gray-500" />;
    }
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'high':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getInsightColor = (impact: string) => {
    switch (impact) {
      case 'positive':
        return 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20';
      case 'negative':
        return 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20';
      default:
        return 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20';
    }
  };

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

  if (selectedCrop) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-background text-foreground'}`}>
        <div className="max-w-[120rem] mx-auto px-6 py-8">
          <Button
            variant="outline"
            onClick={() => setSelectedCrop(null)}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('back')}
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-4xl font-heading font-bold mb-6 text-primary">
                {selectedCrop.crop} Market Analysis
              </h1>
              
              <Card className="p-6 mb-6">
                <h3 className="text-xl font-heading font-semibold mb-4">Price Trend (Last 6 Months)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={selectedCrop.priceHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₹${value}`, 'Price per quintal']} />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#558B2F" 
                      strokeWidth={3}
                      dot={{ fill: '#558B2F', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-xl font-heading font-semibold mb-4">Market Insights</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h4 className="font-semibold mb-2">Price Analysis</h4>
                    <p className="font-paragraph text-gray-600 dark:text-gray-300">
                      Current price of ₹{selectedCrop.currentPrice} per quintal shows a{' '}
                      {selectedCrop.trend === 'up' ? 'positive' : selectedCrop.trend === 'down' ? 'negative' : 'stable'} trend
                      compared to last month's ₹{selectedCrop.previousPrice}.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-secondary/5 rounded-lg">
                    <h4 className="font-semibold mb-2">Demand Forecast</h4>
                    <p className="font-paragraph text-gray-600 dark:text-gray-300">
                      Current demand is {selectedCrop.demand} in {selectedCrop.location} region. 
                      {selectedCrop.demand === 'high' && ' This is an excellent time to sell your produce.'}
                      {selectedCrop.demand === 'medium' && ' Market conditions are stable with moderate demand.'}
                      {selectedCrop.demand === 'low' && ' Consider holding your produce or exploring alternative markets.'}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-beige/20 rounded-lg">
                    <h4 className="font-semibold mb-2">Seasonal Factors</h4>
                    <p className="font-paragraph text-gray-600 dark:text-gray-300">
                      {selectedCrop.crop} is primarily a {selectedCrop.season} crop. 
                      Current market conditions are influenced by seasonal demand patterns and weather conditions.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-heading font-semibold mb-4">Current Market Status</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-paragraph">Current Price</span>
                    <span className="font-bold text-lg">₹{selectedCrop.currentPrice}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-paragraph">Previous Price</span>
                    <span className="font-semibold">₹{selectedCrop.previousPrice}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-paragraph">Trend</span>
                    <div className="flex items-center space-x-2">
                      {getTrendIcon(selectedCrop.trend)}
                      <span className="capitalize">{selectedCrop.trend}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-paragraph">Demand</span>
                    <Badge className={getDemandColor(selectedCrop.demand)}>
                      {selectedCrop.demand}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-paragraph">Season</span>
                    <span className="font-semibold">{selectedCrop.season}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-paragraph">Region</span>
                    <span className="font-semibold">{selectedCrop.location}</span>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-lg font-heading font-semibold mb-4">Recommendations</h3>
                <div className="space-y-3">
                  {selectedCrop.trend === 'up' && (
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="text-sm font-paragraph text-green-800 dark:text-green-200">
                        ✓ Good time to sell - prices are rising
                      </p>
                    </div>
                  )}
                  
                  {selectedCrop.demand === 'high' && (
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-sm font-paragraph text-blue-800 dark:text-blue-200">
                        ✓ High demand - consider increasing production
                      </p>
                    </div>
                  )}
                  
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <p className="text-sm font-paragraph text-yellow-800 dark:text-yellow-200">
                      ⚠ Monitor weather conditions for price impact
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
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
              {t('market')}
            </h1>
            <p className="font-paragraph text-gray-600 dark:text-gray-300 mt-2">
              {t('marketDescription')}
            </p>
          </div>
          <div className="text-6xl">📈</div>
        </div>

        {/* Market Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Card className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-heading font-semibold">Market Overview</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <Calendar className="h-4 w-4" />
                <span>Updated: {new Date().toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {marketData.filter(item => item.trend === 'up').length}
                </div>
                <p className="text-sm font-paragraph text-gray-600 dark:text-gray-300">Prices Rising</p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-1">
                  {marketData.filter(item => item.trend === 'down').length}
                </div>
                <p className="text-sm font-paragraph text-gray-600 dark:text-gray-300">Prices Falling</p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {marketData.filter(item => item.demand === 'high').length}
                </div>
                <p className="text-sm font-paragraph text-gray-600 dark:text-gray-300">High Demand</p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-600 mb-1">
                  {marketData.filter(item => item.trend === 'stable').length}
                </div>
                <p className="text-sm font-paragraph text-gray-600 dark:text-gray-300">Stable Prices</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Market Data Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-heading font-semibold mb-6">Crop Prices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketData.map((crop, index) => (
              <motion.div
                key={crop.crop}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  className="p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
                  onClick={() => setSelectedCrop(crop)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-heading font-semibold text-primary">
                      {crop.crop}
                    </h3>
                    <div className="flex items-center space-x-2">
                      {getTrendIcon(crop.trend)}
                      <Badge className={getDemandColor(crop.demand)}>
                        {crop.demand}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-paragraph text-gray-600 dark:text-gray-300">Current Price</span>
                      <span className="font-bold text-xl">₹{crop.currentPrice}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="font-paragraph text-gray-600 dark:text-gray-300">Previous Price</span>
                      <span className="font-semibold">₹{crop.previousPrice}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="font-paragraph text-gray-600 dark:text-gray-300">Change</span>
                      <span className={`font-semibold ${
                        crop.currentPrice > crop.previousPrice ? 'text-green-600' : 
                        crop.currentPrice < crop.previousPrice ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {crop.currentPrice > crop.previousPrice ? '+' : ''}
                        ₹{crop.currentPrice - crop.previousPrice}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <MapPin className="h-3 w-3 mr-1" />
                        {crop.location}
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{crop.season}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-4" size="sm">
                    View Details
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Market Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-heading font-semibold mb-6">Market Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {insights.map((insight, index) => (
              <Card 
                key={index} 
                className={`p-6 ${getInsightColor(insight.impact)}`}
              >
                <h3 className="text-lg font-heading font-semibold mb-3">
                  {insight.title}
                </h3>
                <p className="font-paragraph text-gray-600 dark:text-gray-300 mb-4">
                  {insight.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {insight.crops.map((crop, cropIndex) => (
                    <Badge key={cropIndex} variant="outline">
                      {crop}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MarketPage;