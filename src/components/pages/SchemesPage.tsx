import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ArrowLeft, ExternalLink, Calendar, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { GovernmentSchemes } from '@/entities';
import { useLanguageStore } from '@/stores/languageStore';
import { useThemeStore } from '@/stores/themeStore';

const SchemesPage = () => {
  const [schemes, setSchemes] = useState<GovernmentSchemes[]>([]);
  const [filteredSchemes, setFilteredSchemes] = useState<GovernmentSchemes[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedScheme, setSelectedScheme] = useState<GovernmentSchemes | null>(null);
  const [loading, setLoading] = useState(true);
  
  const { t } = useLanguageStore();
  const { isDarkMode } = useThemeStore();

  useEffect(() => {
    fetchSchemes();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = schemes.filter(scheme =>
        scheme.schemeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.benefits?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSchemes(filtered);
    } else {
      setFilteredSchemes(schemes);
    }
  }, [searchTerm, schemes]);

  const fetchSchemes = async () => {
    try {
      const { items } = await BaseCrudService.getAll<GovernmentSchemes>('governmentschemes');
      setSchemes(items);
      setFilteredSchemes(items);
    } catch (error) {
      console.error('Error fetching schemes:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return 'N/A';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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

  if (selectedScheme) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-background text-foreground'}`}>
        <div className="max-w-[120rem] mx-auto px-6 py-8">
          <Button
            variant="outline"
            onClick={() => setSelectedScheme(null)}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('back')}
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-4xl font-heading font-bold mb-2 text-primary">
                    {selectedScheme.schemeName}
                  </h1>
                  
                  {selectedScheme.launchDate && (
                    <div className="flex items-center text-gray-600 dark:text-gray-300 mb-4">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="font-paragraph">
                        Launched: {formatDate(selectedScheme.launchDate)}
                      </span>
                    </div>
                  )}
                </div>
                
                {selectedScheme.officialUrl && (
                  <Button asChild>
                    <a 
                      href={selectedScheme.officialUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Official Website
                    </a>
                  </Button>
                )}
              </div>
              
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-xl font-heading font-semibold mb-4 text-primary">
                    {t('description')}
                  </h3>
                  <p className="font-paragraph text-gray-600 dark:text-gray-300">
                    {selectedScheme.description}
                  </p>
                </Card>
                
                <Card className="p-6">
                  <h3 className="text-xl font-heading font-semibold mb-4 text-primary">
                    {t('benefits')}
                  </h3>
                  <div className="font-paragraph text-gray-600 dark:text-gray-300">
                    {selectedScheme.benefits?.split('\n').map((benefit, index) => (
                      <div key={index} className="flex items-start mb-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p>{benefit}</p>
                      </div>
                    ))}
                  </div>
                </Card>
                
                <Card className="p-6">
                  <h3 className="text-xl font-heading font-semibold mb-4 text-primary">
                    {t('applicationProcess')}
                  </h3>
                  <div className="font-paragraph text-gray-600 dark:text-gray-300">
                    {selectedScheme.applicationProcess?.split('\n').map((step, index) => (
                      <div key={index} className="flex items-start mb-3">
                        <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <p>{step}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
            
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-heading font-semibold mb-4 text-primary">
                  {t('eligibility')}
                </h3>
                <div className="font-paragraph text-gray-600 dark:text-gray-300">
                  {selectedScheme.eligibilityCriteria?.split('\n').map((criteria, index) => (
                    <div key={index} className="flex items-start mb-2">
                      <div className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p>{criteria}</p>
                    </div>
                  ))}
                </div>
              </Card>
              
              <Card className="p-6 bg-primary/5 border-primary/20">
                <h3 className="text-lg font-heading font-semibold mb-4 text-primary">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  {selectedScheme.officialUrl && (
                    <Button asChild className="w-full">
                      <a 
                        href={selectedScheme.officialUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Apply Online
                      </a>
                    </Button>
                  )}
                  
                  <Button variant="outline" className="w-full">
                    <IndianRupee className="h-4 w-4 mr-2" />
                    Calculate Benefits
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    Download Guidelines
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
              {t('schemes')}
            </h1>
            <p className="font-paragraph text-gray-600 dark:text-gray-300 mt-2">
              {t('schemesDescription')}
            </p>
          </div>
          <div className="text-6xl">🏛️</div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder={`${t('search')} ${t('schemes').toLowerCase()}...`}
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

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.map((scheme, index) => (
            <motion.div
              key={scheme._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                className="h-full cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
                onClick={() => setSelectedScheme(scheme)}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-heading font-semibold text-primary line-clamp-2">
                      {scheme.schemeName}
                    </h3>
                    <Badge variant="secondary" className="ml-2 flex-shrink-0">
                      Active
                    </Badge>
                  </div>
                  
                  <p className="font-paragraph text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
                    {scheme.description}
                  </p>
                  
                  <div className="space-y-2 text-sm mb-4">
                    {scheme.launchDate && (
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <Calendar className="h-3 w-3 mr-2" />
                        <span>Launched: {formatDate(scheme.launchDate)}</span>
                      </div>
                    )}
                    
                    {scheme.officialUrl && (
                      <div className="flex items-center text-primary">
                        <ExternalLink className="h-3 w-3 mr-2" />
                        <span>Official Website Available</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <span className="font-semibold text-gray-600 dark:text-gray-300 text-xs">
                        Key Benefits:
                      </span>
                      <p className="font-paragraph text-gray-600 dark:text-gray-300 text-xs line-clamp-2">
                        {scheme.benefits}
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

        {filteredSchemes.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-heading font-semibold mb-2">
              {t('noSchemesFound')}
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

export default SchemesPage;