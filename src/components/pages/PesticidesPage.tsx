import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ArrowLeft, AlertTriangle, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Image } from '@/components/ui/image';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { Pesticides } from '@/entities';
import { useLanguageStore } from '@/stores/languageStore';
import { useThemeStore } from '@/stores/themeStore';

const PesticidesPage = () => {
  const [pesticides, setPesticides] = useState<Pesticides[]>([]);
  const [filteredPesticides, setFilteredPesticides] = useState<Pesticides[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPesticide, setSelectedPesticide] = useState<Pesticides | null>(null);
  const [loading, setLoading] = useState(true);
  
  const { t } = useLanguageStore();
  const { isDarkMode } = useThemeStore();

  useEffect(() => {
    fetchPesticides();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = pesticides.filter(pesticide =>
        pesticide.pesticideName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pesticide.pesticideType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pesticide.targetCrops?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPesticides(filtered);
    } else {
      setFilteredPesticides(pesticides);
    }
  }, [searchTerm, pesticides]);

  const fetchPesticides = async () => {
    try {
      const { items } = await BaseCrudService.getAll<Pesticides>('pesticides');
      setPesticides(items);
      setFilteredPesticides(items);
    } catch (error) {
      console.error('Error fetching pesticides:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPesticideTypeColor = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'insecticide':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'fungicide':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'herbicide':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'bactericide':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
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

  if (selectedPesticide) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-background text-foreground'}`}>
        <div className="max-w-[120rem] mx-auto px-6 py-8">
          <Button
            variant="outline"
            onClick={() => setSelectedPesticide(null)}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('back')}
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {selectedPesticide.productImage && (
                <Image
                  src={selectedPesticide.productImage}
                  alt={selectedPesticide.pesticideName || 'Pesticide'}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                  width={600}
                />
              )}
              
              <h1 className="text-4xl font-heading font-bold mb-4 text-primary">
                {selectedPesticide.pesticideName}
              </h1>
              
              <div className="flex items-center space-x-4 mb-6">
                <Badge className={getPesticideTypeColor(selectedPesticide.pesticideType || '')}>
                  {selectedPesticide.pesticideType}
                </Badge>
                
                {selectedPesticide.targetCrops && (
                  <div className="flex flex-wrap gap-2">
                    {selectedPesticide.targetCrops.split(',').slice(0, 3).map((crop, index) => (
                      <Badge key={index} variant="outline">
                        {crop.trim()}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              
              <Alert className="mb-6 border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-900/20">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <AlertDescription className="text-orange-800 dark:text-orange-200">
                  Always read and follow label instructions. Use protective equipment when handling pesticides.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-xl font-heading font-semibold mb-4 text-primary">
                    {t('description')}
                  </h3>
                  <p className="font-paragraph text-gray-600 dark:text-gray-300">
                    {selectedPesticide.description}
                  </p>
                </Card>
                
                <Card className="p-6">
                  <h3 className="text-xl font-heading font-semibold mb-4 text-primary">
                    {t('activeIngredients')}
                  </h3>
                  <p className="font-paragraph text-gray-600 dark:text-gray-300">
                    {selectedPesticide.activeIngredients}
                  </p>
                </Card>
                
                <Card className="p-6">
                  <h3 className="text-xl font-heading font-semibold mb-4 text-primary">
                    {t('applicationInstructions')}
                  </h3>
                  <div className="font-paragraph text-gray-600 dark:text-gray-300">
                    {selectedPesticide.applicationInstructions?.split('\n').map((instruction, index) => (
                      <div key={index} className="flex items-start mb-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p>{instruction}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
            
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-heading font-semibold mb-4 text-primary">
                  {t('targetCrops')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedPesticide.targetCrops?.split(',').map((crop, index) => (
                    <Badge key={index} variant="secondary">
                      {crop.trim()}
                    </Badge>
                  ))}
                </div>
              </Card>
              
              <Card className="p-6 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
                <div className="flex items-center mb-4">
                  <Shield className="h-5 w-5 text-red-600 mr-2" />
                  <h3 className="text-lg font-heading font-semibold text-red-800 dark:text-red-200">
                    {t('safetyPrecautions')}
                  </h3>
                </div>
                <div className="font-paragraph text-red-700 dark:text-red-300">
                  {selectedPesticide.safetyPrecautions?.split('\n').map((precaution, index) => (
                    <div key={index} className="flex items-start mb-2">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p>{precaution}</p>
                    </div>
                  ))}
                </div>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-lg font-heading font-semibold mb-4 text-primary">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Button className="w-full" variant="outline">
                    Calculate Dosage
                  </Button>
                  <Button className="w-full" variant="outline">
                    Find Dealers
                  </Button>
                  <Button className="w-full" variant="outline">
                    Download Safety Guide
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
              {t('pesticides')}
            </h1>
            <p className="font-paragraph text-gray-600 dark:text-gray-300 mt-2">
              {t('pesticidesDescription')}
            </p>
          </div>
          <div className="text-6xl">🧪</div>
        </div>

        {/* Safety Notice */}
        <Alert className="mb-8 border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-900/20">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800 dark:text-orange-200">
            <strong>Important:</strong> Always consult with agricultural experts before using pesticides. 
            Follow all safety guidelines and local regulations.
          </AlertDescription>
        </Alert>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder={`${t('search')} ${t('pesticides').toLowerCase()}...`}
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

        {/* Pesticides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPesticides.map((pesticide, index) => (
            <motion.div
              key={pesticide._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                className="h-full cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
                onClick={() => setSelectedPesticide(pesticide)}
              >
                {pesticide.productImage ? (
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <Image
                      src={pesticide.productImage}
                      alt={pesticide.pesticideName || 'Pesticide'}
                      className="w-full h-full object-cover"
                      width={300}
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 flex items-center justify-center rounded-t-lg">
                    <div className="text-6xl">🧪</div>
                  </div>
                )}
                
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-heading font-semibold text-primary line-clamp-2">
                      {pesticide.pesticideName}
                    </h3>
                    {pesticide.pesticideType && (
                      <Badge className={`ml-2 flex-shrink-0 ${getPesticideTypeColor(pesticide.pesticideType)}`}>
                        {pesticide.pesticideType}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-semibold text-gray-600 dark:text-gray-300">
                        {t('targetCrops')}:
                      </span>
                      <p className="font-paragraph text-gray-600 dark:text-gray-300 line-clamp-2">
                        {pesticide.targetCrops}
                      </p>
                    </div>
                    
                    {pesticide.activeIngredients && (
                      <div>
                        <span className="font-semibold text-gray-600 dark:text-gray-300">
                          {t('activeIngredients')}:
                        </span>
                        <p className="font-paragraph text-gray-600 dark:text-gray-300 line-clamp-2">
                          {pesticide.activeIngredients}
                        </p>
                      </div>
                    )}
                    
                    {pesticide.description && (
                      <p className="font-paragraph text-gray-600 dark:text-gray-300 line-clamp-3">
                        {pesticide.description}
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

        {filteredPesticides.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-heading font-semibold mb-2">
              {t('noPesticidesFound')}
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

export default PesticidesPage;