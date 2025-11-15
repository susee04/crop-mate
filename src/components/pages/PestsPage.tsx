import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ArrowLeft, Bug } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Image } from '@/components/ui/image';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { Pests } from '@/entities';
import { useLanguageStore } from '@/stores/languageStore';
import { useThemeStore } from '@/stores/themeStore';

const PestsPage = () => {
  const [pests, setPests] = useState<Pests[]>([]);
  const [filteredPests, setFilteredPests] = useState<Pests[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPest, setSelectedPest] = useState<Pests | null>(null);
  const [loading, setLoading] = useState(true);
  
  const { t } = useLanguageStore();
  const { isDarkMode } = useThemeStore();

  useEffect(() => {
    fetchPests();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = pests.filter(pest =>
        pest.pestName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pest.scientificName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pest.affectedCrops?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPests(filtered);
    } else {
      setFilteredPests(pests);
    }
  }, [searchTerm, pests]);

  const fetchPests = async () => {
    try {
      const { items } = await BaseCrudService.getAll<Pests>('pests');
      setPests(items);
      setFilteredPests(items);
    } catch (error) {
      console.error('Error fetching pests:', error);
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

  if (selectedPest) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-background text-foreground'}`}>
        <div className="max-w-[120rem] mx-auto px-6 py-8">
          <Button
            variant="outline"
            onClick={() => setSelectedPest(null)}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('back')}
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              {selectedPest.pestImage && (
                <Image
                  src={selectedPest.pestImage}
                  alt={selectedPest.pestName || 'Pest'}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                  width={600}
                />
              )}
              
              <h1 className="text-4xl font-heading font-bold mb-2 text-primary">
                {selectedPest.pestName}
              </h1>
              
              {selectedPest.scientificName && (
                <p className="text-lg font-paragraph italic text-gray-600 dark:text-gray-300 mb-4">
                  {selectedPest.scientificName}
                </p>
              )}
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-heading font-semibold mb-2">{t('description')}</h3>
                  <p className="font-paragraph text-gray-600 dark:text-gray-300">
                    {selectedPest.pestDescription}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-heading font-semibold mb-2">{t('affectedCrops')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPest.affectedCrops?.split(',').map((crop, index) => (
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
                  {t('identification')}
                </h3>
                <p className="font-paragraph text-gray-600 dark:text-gray-300">
                  {selectedPest.identificationMethods}
                </p>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-xl font-heading font-semibold mb-4 text-primary">
                  {t('damage')}
                </h3>
                <p className="font-paragraph text-gray-600 dark:text-gray-300">
                  {selectedPest.damageCaused}
                </p>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-xl font-heading font-semibold mb-4 text-primary">
                  {t('organicManagement')}
                </h3>
                <p className="font-paragraph text-gray-600 dark:text-gray-300">
                  {selectedPest.organicManagement}
                </p>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-xl font-heading font-semibold mb-4 text-primary">
                  {t('chemicalManagement')}
                </h3>
                <p className="font-paragraph text-gray-600 dark:text-gray-300">
                  {selectedPest.chemicalManagement}
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
              {t('pests')}
            </h1>
            <p className="font-paragraph text-gray-600 dark:text-gray-300 mt-2">
              {t('pestDescription')}
            </p>
          </div>
          <div className="text-6xl">🐛</div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder={`${t('search')} ${t('pests').toLowerCase()}...`}
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

        {/* Pests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPests.map((pest, index) => (
            <motion.div
              key={pest._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                className="h-full cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
                onClick={() => setSelectedPest(pest)}
              >
                {pest.pestImage ? (
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <Image
                      src={pest.pestImage}
                      alt={pest.pestName || 'Pest'}
                      className="w-full h-full object-cover"
                      width={300}
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gray-100 dark:bg-gray-800 flex items-center justify-center rounded-t-lg">
                    <Bug className="h-16 w-16 text-gray-400" />
                  </div>
                )}
                
                <div className="p-4">
                  <h3 className="text-lg font-heading font-semibold mb-1 text-primary">
                    {pest.pestName}
                  </h3>
                  
                  {pest.scientificName && (
                    <p className="text-sm font-paragraph italic text-gray-500 dark:text-gray-400 mb-3">
                      {pest.scientificName}
                    </p>
                  )}
                  
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-semibold text-gray-600 dark:text-gray-300">
                        {t('affectedCrops')}:
                      </span>
                      <p className="font-paragraph text-gray-600 dark:text-gray-300 line-clamp-2">
                        {pest.affectedCrops}
                      </p>
                    </div>
                    
                    {pest.pestDescription && (
                      <p className="font-paragraph text-gray-600 dark:text-gray-300 line-clamp-3">
                        {pest.pestDescription}
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

        {filteredPests.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-heading font-semibold mb-2">
              {t('noPestsFound')}
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

export default PestsPage;