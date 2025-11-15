import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Image } from '@/components/ui/image';
import { Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { Crops } from '@/entities';
import { useLanguageStore } from '@/stores/languageStore';
import { useThemeStore } from '@/stores/themeStore';

const CropsPage = () => {
  const [crops, setCrops] = useState<Crops[]>([]);
  const [filteredCrops, setFilteredCrops] = useState<Crops[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCrop, setSelectedCrop] = useState<Crops | null>(null);
  const [loading, setLoading] = useState(true);
  
  const { t } = useLanguageStore();
  const { isDarkMode } = useThemeStore();

  useEffect(() => {
    fetchCrops();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = crops.filter(crop =>
        crop.cropName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crop.suitableRegionsIndia?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCrops(filtered);
    } else {
      setFilteredCrops(crops);
    }
  }, [searchTerm, crops]);

  const fetchCrops = async () => {
    try {
      const { items } = await BaseCrudService.getAll<Crops>('crops');
      setCrops(items);
      setFilteredCrops(items);
    } catch (error) {
      console.error('Error fetching crops:', error);
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
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              {selectedCrop.cropImage && (
                <Image
                  src={selectedCrop.cropImage}
                  alt={selectedCrop.cropName || 'Crop'}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                  width={600}
                />
              )}
              
              <h1 className="text-4xl font-heading font-bold mb-4 text-primary">
                {selectedCrop.cropName}
              </h1>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-heading font-semibold mb-2">{t('suitableRegions')}</h3>
                  <p className="font-paragraph text-gray-600 dark:text-gray-300">
                    {selectedCrop.suitableRegionsIndia}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-heading font-semibold mb-2">{t('expectedYield')}</h3>
                  <p className="font-paragraph text-gray-600 dark:text-gray-300">
                    {selectedCrop.expectedYield}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-heading font-semibold mb-4 text-primary">
                  {t('plantingInstructions')}
                </h3>
                <p className="font-paragraph text-gray-600 dark:text-gray-300">
                  {selectedCrop.plantingInstructions}
                </p>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-xl font-heading font-semibold mb-4 text-primary">
                  {t('careGuidelines')}
                </h3>
                <p className="font-paragraph text-gray-600 dark:text-gray-300">
                  {selectedCrop.careGuidelines}
                </p>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-xl font-heading font-semibold mb-4 text-primary">
                  {t('harvestingInfo')}
                </h3>
                <p className="font-paragraph text-gray-600 dark:text-gray-300">
                  {selectedCrop.harvestingInformation}
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
              {t('crops')}
            </h1>
            <p className="font-paragraph text-gray-600 dark:text-gray-300 mt-2">
              {t('cropDescription')}
            </p>
          </div>
          <div className="text-6xl">🌾</div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder={`${t('search')} ${t('crops').toLowerCase()}...`}
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

        {/* Crops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCrops.map((crop, index) => (
            <motion.div
              key={crop._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                className="h-full cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
                onClick={() => setSelectedCrop(crop)}
              >
                {crop.cropImage && (
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <Image
                      src={crop.cropImage}
                      alt={crop.cropName || 'Crop'}
                      className="w-full h-full object-cover"
                      width={300}
                    />
                  </div>
                )}
                
                <div className="p-4">
                  <h3 className="text-lg font-heading font-semibold mb-2 text-primary">
                    {crop.cropName}
                  </h3>
                  
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-semibold text-gray-600 dark:text-gray-300">
                        {t('suitableRegions')}:
                      </span>
                      <p className="font-paragraph text-gray-600 dark:text-gray-300 line-clamp-2">
                        {crop.suitableRegionsIndia}
                      </p>
                    </div>
                    
                    <div>
                      <span className="font-semibold text-gray-600 dark:text-gray-300">
                        {t('expectedYield')}:
                      </span>
                      <p className="font-paragraph text-gray-600 dark:text-gray-300 line-clamp-1">
                        {crop.expectedYield}
                      </p>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-4" size="sm">
                    {t('learnMore')}
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredCrops.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-heading font-semibold mb-2">
              {t('noCropsFound')}
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

export default CropsPage;