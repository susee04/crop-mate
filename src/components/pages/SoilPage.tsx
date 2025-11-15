import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ArrowLeft, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Image } from '@/components/ui/image';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { SoilTypes } from '@/entities';
import { useLanguageStore } from '@/stores/languageStore';
import { useThemeStore } from '@/stores/themeStore';

const SoilPage = () => {
  const [soilTypes, setSoilTypes] = useState<SoilTypes[]>([]);
  const [filteredSoilTypes, setFilteredSoilTypes] = useState<SoilTypes[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSoil, setSelectedSoil] = useState<SoilTypes | null>(null);
  const [loading, setLoading] = useState(true);
  
  const { t } = useLanguageStore();
  const { isDarkMode } = useThemeStore();

  useEffect(() => {
    fetchSoilTypes();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = soilTypes.filter(soil =>
        soil.soilTypeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        soil.geographicalDistribution?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        soil.suitableCrops?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSoilTypes(filtered);
    } else {
      setFilteredSoilTypes(soilTypes);
    }
  }, [searchTerm, soilTypes]);

  const fetchSoilTypes = async () => {
    try {
      const { items } = await BaseCrudService.getAll<SoilTypes>('soiltypes');
      setSoilTypes(items);
      setFilteredSoilTypes(items);
    } catch (error) {
      console.error('Error fetching soil types:', error);
    } finally {
      setLoading(false);
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

  if (selectedSoil) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-background text-foreground'}`}>
        <div className="max-w-[120rem] mx-auto px-6 py-8">
          <Button
            variant="outline"
            onClick={() => setSelectedSoil(null)}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('back')}
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              {selectedSoil.soilImage && (
                <Image
                  src={selectedSoil.soilImage}
                  alt={selectedSoil.soilTypeName || 'Soil'}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                  width={600}
                />
              )}
              
              <h1 className="text-4xl font-heading font-bold mb-4 text-primary">
                {selectedSoil.soilTypeName}
              </h1>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-heading font-semibold mb-2">{t('description')}</h3>
                  <p className="font-paragraph text-gray-600 dark:text-gray-300">
                    {selectedSoil.description}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-heading font-semibold mb-2 flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {t('distribution')}
                  </h3>
                  <p className="font-paragraph text-gray-600 dark:text-gray-300">
                    {selectedSoil.geographicalDistribution}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-heading font-semibold mb-2">{t('suitableCrops')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedSoil.suitableCrops?.split(',').map((crop, index) => (
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
                  {t('properties')}
                </h3>
                <p className="font-paragraph text-gray-600 dark:text-gray-300">
                  {selectedSoil.keyProperties}
                </p>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-xl font-heading font-semibold mb-4 text-primary">
                  {t('improvements')}
                </h3>
                <p className="font-paragraph text-gray-600 dark:text-gray-300">
                  {selectedSoil.healthImprovementRecommendations}
                </p>
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
              {t('soil')}
            </h1>
            <p className="font-paragraph text-gray-600 dark:text-gray-300 mt-2">
              {t('soilDescription')}
            </p>
          </div>
          <div className="text-6xl">🌱</div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder={`${t('search')} ${t('soil').toLowerCase()} ${t('soilType').toLowerCase()}...`}
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

        {/* Soil Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSoilTypes.map((soil, index) => (
            <motion.div
              key={soil._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                className="h-full cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
                onClick={() => setSelectedSoil(soil)}
              >
                {soil.soilImage ? (
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <Image
                      src={soil.soilImage}
                      alt={soil.soilTypeName || 'Soil'}
                      className="w-full h-full object-cover"
                      width={300}
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900 dark:to-amber-800 flex items-center justify-center rounded-t-lg">
                    <div className="text-6xl">🌱</div>
                  </div>
                )}
                
                <div className="p-4">
                  <h3 className="text-lg font-heading font-semibold mb-2 text-primary">
                    {soil.soilTypeName}
                  </h3>
                  
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-semibold text-gray-600 dark:text-gray-300">
                        {t('distribution')}:
                      </span>
                      <p className="font-paragraph text-gray-600 dark:text-gray-300 line-clamp-2">
                        {soil.geographicalDistribution}
                      </p>
                    </div>
                    
                    <div>
                      <span className="font-semibold text-gray-600 dark:text-gray-300">
                        {t('suitableCrops')}:
                      </span>
                      <p className="font-paragraph text-gray-600 dark:text-gray-300 line-clamp-2">
                        {soil.suitableCrops}
                      </p>
                    </div>
                    
                    {soil.description && (
                      <p className="font-paragraph text-gray-600 dark:text-gray-300 line-clamp-3">
                        {soil.description}
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

        {filteredSoilTypes.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-heading font-semibold mb-2">
              {t('noSoilTypesFound')}
            </h3>
            <p className="font-paragraph text-gray-600 dark:text-gray-300">
              {t('tryDifferentSearch')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SoilPage;