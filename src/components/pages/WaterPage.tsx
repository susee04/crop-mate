import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ArrowLeft, Droplets } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Image } from '@/components/ui/image';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { WaterManagementTechniques } from '@/entities';
import { useLanguageStore } from '@/stores/languageStore';
import { useThemeStore } from '@/stores/themeStore';

const WaterPage = () => {
  const [techniques, setTechniques] = useState<WaterManagementTechniques[]>([]);
  const [filteredTechniques, setFilteredTechniques] = useState<WaterManagementTechniques[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTechnique, setSelectedTechnique] = useState<WaterManagementTechniques | null>(null);
  const [loading, setLoading] = useState(true);
  
  const { t } = useLanguageStore();
  const { isDarkMode } = useThemeStore();

  useEffect(() => {
    fetchTechniques();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = techniques.filter(technique =>
        technique.techniqueName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        technique.irrigationMethodType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        technique.applicableCrops?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTechniques(filtered);
    } else {
      setFilteredTechniques(techniques);
    }
  }, [searchTerm, techniques]);

  const fetchTechniques = async () => {
    try {
      const { items } = await BaseCrudService.getAll<WaterManagementTechniques>('watermanagementtechniques');
      setTechniques(items);
      setFilteredTechniques(items);
    } catch (error) {
      console.error('Error fetching water management techniques:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMethodTypeColor = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'drip irrigation':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'sprinkler irrigation':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'surface irrigation':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'subsurface irrigation':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'rainwater harvesting':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
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

  if (selectedTechnique) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-background text-foreground'}`}>
        <div className="max-w-[120rem] mx-auto px-6 py-8">
          <Button
            variant="outline"
            onClick={() => setSelectedTechnique(null)}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('back')}
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              {selectedTechnique.techniqueImage && (
                <Image
                  src={selectedTechnique.techniqueImage}
                  alt={selectedTechnique.techniqueName || 'Water Management Technique'}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                  width={600}
                />
              )}
              
              <h1 className="text-4xl font-heading font-bold mb-4 text-primary">
                {selectedTechnique.techniqueName}
              </h1>
              
              <div className="flex items-center space-x-4 mb-6">
                {selectedTechnique.irrigationMethodType && (
                  <Badge className={getMethodTypeColor(selectedTechnique.irrigationMethodType)}>
                    {selectedTechnique.irrigationMethodType}
                  </Badge>
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-heading font-semibold mb-2">{t('description')}</h3>
                  <p className="font-paragraph text-gray-600 dark:text-gray-300">
                    {selectedTechnique.description}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-heading font-semibold mb-2">{t('applicableCrops')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedTechnique.applicableCrops?.split(',').map((crop, index) => (
                      <Badge key={index} variant="secondary">
                        {crop.trim()}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-heading font-semibold mb-4 text-primary">
                  {t('benefits')}
                </h3>
                <div className="font-paragraph text-gray-600 dark:text-gray-300">
                  {selectedTechnique.benefits?.split('\n').map((benefit, index) => (
                    <div key={index} className="flex items-start mb-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p>{benefit}</p>
                    </div>
                  ))}
                </div>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-xl font-heading font-semibold mb-4 text-primary">
                  {t('conservationTips')}
                </h3>
                <div className="font-paragraph text-gray-600 dark:text-gray-300">
                  {selectedTechnique.conservationTips?.split('\n').map((tip, index) => (
                    <div key={index} className="flex items-start mb-3">
                      <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <p>{tip}</p>
                    </div>
                  ))}
                </div>
              </Card>
              
              <Card className="p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <h3 className="text-lg font-heading font-semibold mb-4 text-blue-800 dark:text-blue-200">
                  Water Efficiency Calculator
                </h3>
                <div className="space-y-3">
                  <Button className="w-full" variant="outline">
                    Calculate Water Savings
                  </Button>
                  <Button className="w-full" variant="outline">
                    Cost-Benefit Analysis
                  </Button>
                  <Button className="w-full" variant="outline">
                    Implementation Guide
                  </Button>
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
              {t('water')}
            </h1>
            <p className="font-paragraph text-gray-600 dark:text-gray-300 mt-2">
              {t('waterDescription')}
            </p>
          </div>
          <div className="text-6xl">💧</div>
        </div>

        {/* Water Conservation Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
            <div className="flex items-center mb-4">
              <Droplets className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-heading font-semibold text-blue-800 dark:text-blue-200">
                Water Conservation Tips
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-2">🌧️</div>
                <h3 className="font-semibold mb-2">Rainwater Harvesting</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Collect and store rainwater for irrigation during dry periods
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl mb-2">💧</div>
                <h3 className="font-semibold mb-2">Drip Irrigation</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Save up to 50% water with efficient drip irrigation systems
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl mb-2">🌱</div>
                <h3 className="font-semibold mb-2">Mulching</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Reduce water evaporation by covering soil with organic matter
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder={`${t('search')} ${t('water').toLowerCase()} ${t('techniqueName').toLowerCase()}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            {t('filter')}
          </Button>
        </div>

        {/* Water Management Techniques Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTechniques.map((technique, index) => (
            <motion.div
              key={technique._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                className="h-full cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
                onClick={() => setSelectedTechnique(technique)}
              >
                {technique.techniqueImage ? (
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <Image
                      src={technique.techniqueImage}
                      alt={technique.techniqueName || 'Water Management Technique'}
                      className="w-full h-full object-cover"
                      width={300}
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-cyan-200 dark:from-blue-900 dark:to-cyan-800 flex items-center justify-center rounded-t-lg">
                    <div className="text-6xl">💧</div>
                  </div>
                )}
                
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-heading font-semibold text-primary line-clamp-2">
                      {technique.techniqueName}
                    </h3>
                    {technique.irrigationMethodType && (
                      <Badge className={`ml-2 flex-shrink-0 ${getMethodTypeColor(technique.irrigationMethodType)}`}>
                        {technique.irrigationMethodType}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-semibold text-gray-600 dark:text-gray-300">
                        {t('applicableCrops')}:
                      </span>
                      <p className="font-paragraph text-gray-600 dark:text-gray-300 line-clamp-2">
                        {technique.applicableCrops}
                      </p>
                    </div>
                    
                    {technique.description && (
                      <p className="font-paragraph text-gray-600 dark:text-gray-300 line-clamp-3">
                        {technique.description}
                      </p>
                    )}
                  </div>
                  
                  <Button className="w-full mt-4" size="sm">
                    {t('learnMore')}
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredTechniques.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-heading font-semibold mb-2">
              {t('noTechniquesFound')}
            </h3>
            <p className="font-paragraph text-gray-600 dark:text-gray-300">
              {t('tryDifferentSearch')}
            </p>
          </div>
        )}

        {/* Water Efficiency Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-heading font-semibold mb-6">Water Efficiency Best Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-heading font-semibold mb-3 text-primary">
                Soil Moisture Monitoring
              </h3>
              <p className="font-paragraph text-gray-600 dark:text-gray-300">
                Use soil moisture sensors to determine optimal irrigation timing and avoid overwatering.
              </p>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-heading font-semibold mb-3 text-primary">
                Crop Selection
              </h3>
              <p className="font-paragraph text-gray-600 dark:text-gray-300">
                Choose drought-resistant crop varieties that require less water while maintaining good yields.
              </p>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-heading font-semibold mb-3 text-primary">
                Irrigation Scheduling
              </h3>
              <p className="font-paragraph text-gray-600 dark:text-gray-300">
                Water crops during early morning or evening to minimize evaporation losses.
              </p>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-heading font-semibold mb-3 text-primary">
                System Maintenance
              </h3>
              <p className="font-paragraph text-gray-600 dark:text-gray-300">
                Regular maintenance of irrigation systems prevents water waste from leaks and blockages.
              </p>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-heading font-semibold mb-3 text-primary">
                Water Recycling
              </h3>
              <p className="font-paragraph text-gray-600 dark:text-gray-300">
                Implement systems to collect and reuse drainage water for irrigation purposes.
              </p>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-heading font-semibold mb-3 text-primary">
                Weather Integration
              </h3>
              <p className="font-paragraph text-gray-600 dark:text-gray-300">
                Use weather forecasts to adjust irrigation schedules and take advantage of natural rainfall.
              </p>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WaterPage;