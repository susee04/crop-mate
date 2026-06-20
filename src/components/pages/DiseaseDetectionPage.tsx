import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, Camera, X, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useLanguageStore } from '@/stores/languageStore';
import { useThemeStore } from '@/stores/themeStore';
import { MemoizedPageHeader as PageHeader } from '@/components/ui/page-header';

interface DetectionResult {
  diseaseName: string;
  confidence: number;
  symptoms: string[];
  causes: string[];
  treatments: string[];
  severity: 'low' | 'medium' | 'high';
  preventionTips: string[];
}

const DiseaseDetectionPage = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const { t } = useLanguageStore();
  const { isDarkMode } = useThemeStore();

  const handleImageSelect = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      setDetectionResult(null);
      setError(null);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setError('Please select a valid image file');
    }
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageSelect(file);
    }
  };

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      handleImageSelect(file);
    }
  }, [handleImageSelect]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const analyzeImage = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    setError(null);
    
    // Simulate AI analysis
    setTimeout(() => {
      // Mock detection result
      const mockResults: DetectionResult[] = [
        {
          diseaseName: 'Late Blight',
          confidence: 87,
          symptoms: [
            'Dark brown spots on leaves',
            'White fuzzy growth on leaf undersides',
            'Yellowing and wilting of affected areas',
            'Rapid spread during humid conditions'
          ],
          causes: [
            'Fungal infection (Phytophthora infestans)',
            'High humidity and moisture',
            'Cool temperatures (15-20°C)',
            'Poor air circulation'
          ],
          treatments: [
            'Apply copper-based fungicides',
            'Remove and destroy infected plant parts',
            'Improve drainage and air circulation',
            'Use resistant crop varieties'
          ],
          severity: 'high',
          preventionTips: [
            'Avoid overhead watering',
            'Ensure proper plant spacing',
            'Apply preventive fungicide sprays',
            'Monitor weather conditions regularly'
          ]
        },
        {
          diseaseName: 'Powdery Mildew',
          confidence: 92,
          symptoms: [
            'White powdery coating on leaves',
            'Yellowing of affected leaves',
            'Stunted growth',
            'Reduced fruit quality'
          ],
          causes: [
            'Fungal infection',
            'High humidity with dry conditions',
            'Poor air circulation',
            'Overcrowded plants'
          ],
          treatments: [
            'Apply sulfur-based fungicides',
            'Use baking soda spray (1 tsp per liter)',
            'Improve air circulation',
            'Remove affected plant parts'
          ],
          severity: 'medium',
          preventionTips: [
            'Provide adequate plant spacing',
            'Avoid overhead watering',
            'Choose resistant varieties',
            'Regular monitoring and early intervention'
          ]
        }
      ];
      
      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      setDetectionResult(randomResult);
      setIsAnalyzing(false);
    }, 3000);
  };

  const clearImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setDetectionResult(null);
    setError(null);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-background text-foreground'}`}>
      <div className="max-w-[120rem] mx-auto px-6 py-8">
        {/* Header */}
        <PageHeader
          title={t('diseaseDetection')}
          description={t('diseaseDescription')}
          icon="🔍"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Upload Section */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-heading font-semibold mb-4 text-primary">
                {t('uploadImage')}
              </h2>
              
              {!imagePreview ? (
                <div
                  className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-paragraph text-gray-600 dark:text-gray-300 mb-2">
                    {t('uploadToStartDetection')}
                  </p>
                  <p className="text-sm font-paragraph text-gray-500 dark:text-gray-400 mb-4">
                    {t('orClickToSelect')}
                  </p>
                  <Button variant="outline">
                    <Camera className="h-4 w-4 mr-2" />
                    {t('selectImage')}
                  </Button>
                  
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="relative">
                  <Image
                    src={imagePreview}
                    alt="Selected crop image"
                    className="w-full h-64 object-cover rounded-lg"
                    width={500}
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={clearImage}
                    className="absolute top-2 right-2"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
              
              {error && (
                <Alert className="mt-4 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800 dark:text-red-200">
                    {error}
                  </AlertDescription>
                </Alert>
              )}
              
              {selectedImage && !isAnalyzing && !detectionResult && (
                <Button 
                  onClick={analyzeImage}
                  className="w-full mt-4"
                  size="lg"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  {t('detectDisease')}
                </Button>
              )}
              
              {isAnalyzing && (
                <div className="text-center mt-4">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
                  <p className="font-paragraph text-gray-600 dark:text-gray-300">
                    {t('analyzingImage')}
                  </p>
                </div>
              )}
            </Card>
            
            {/* Instructions */}
            <Card className="p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <h3 className="text-lg font-heading font-semibold mb-3 text-blue-800 dark:text-blue-200">
                {t('tipsForDetection')}
              </h3>
              <ul className="space-y-2 font-paragraph text-blue-700 dark:text-blue-300">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  {t('tip1')}
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  {t('tip2')}
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  {t('tip3')}
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  {t('tip4')}
                </li>
              </ul>
            </Card>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {detectionResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-heading font-semibold text-primary">
                      {t('detectionResults')}
                    </h2>
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getSeverityColor(detectionResult.severity)}`}>
                      {t(detectionResult.severity.toLowerCase()).toUpperCase()} {t('severity').toUpperCase()}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-2xl font-heading font-bold text-primary mb-2">
                      {detectionResult.diseaseName}
                    </h3>
                    <p className="text-sm font-paragraph text-gray-600 dark:text-gray-300">
                      {t('confidence')}: {detectionResult.confidence}%
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-heading font-semibold mb-3 text-primary">
                        {t('symptoms')}
                      </h4>
                      <ul className="space-y-2">
                        {detectionResult.symptoms.map((symptom, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="font-paragraph text-gray-600 dark:text-gray-300">{symptom}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-heading font-semibold mb-3 text-primary">
                        {t('causes')}
                      </h4>
                      <ul className="space-y-2">
                        {detectionResult.causes.map((cause, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="font-paragraph text-gray-600 dark:text-gray-300">{cause}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-heading font-semibold mb-3 text-primary">
                        {t('treatment')}
                      </h4>
                      <ul className="space-y-2">
                        {detectionResult.treatments.map((treatment, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="font-paragraph text-gray-600 dark:text-gray-300">{treatment}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-heading font-semibold mb-3 text-primary">
                        {t('preventionTips')}
                      </h4>
                      <ul className="space-y-2">
                        {detectionResult.preventionTips.map((tip, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="font-paragraph text-gray-600 dark:text-gray-300">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex space-x-3">
                      <Button className="flex-1">
                        {t('getExpertConsultation')}
                      </Button>
                      <Button variant="outline" className="flex-1">
                        {t('saveResults')}
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
            
            {!detectionResult && !isAnalyzing && (
              <Card className="p-8 text-center">
                <div className="text-6xl mb-4">🔬</div>
                <h3 className="text-xl font-heading font-semibold mb-2">
                  {t('readyToAnalyze')}
                </h3>
                <p className="font-paragraph text-gray-600 dark:text-gray-300">
                  {t('uploadToStartDetection')}
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Recent Detections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-heading font-semibold mb-6">{t('commonCropDiseases')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Late Blight', crop: 'Tomato', severity: 'High', image: 'https://static.wixstatic.com/media/7cdd40_8a6c4fdaff62493ba0d2f2f6a2f3abe0~mv2.png?originWidth=256&originHeight=192' },
              { name: 'Powdery Mildew', crop: 'Cucumber', severity: 'Medium', image: 'https://static.wixstatic.com/media/7cdd40_f7daf10ced83499e867d42cac67cb926~mv2.png?originWidth=256&originHeight=192' },
              { name: 'Bacterial Wilt', crop: 'Eggplant', severity: 'High', image: 'https://static.wixstatic.com/media/7cdd40_e2184005534949718dff6dcbce88327c~mv2.png?originWidth=256&originHeight=192' },
              { name: 'Leaf Spot', crop: 'Pepper', severity: 'Low', image: 'https://static.wixstatic.com/media/7cdd40_9565e8dbb6ec41afb102ffa79cc93714~mv2.png?originWidth=256&originHeight=192' },
              { name: 'Root Rot', crop: 'Beans', severity: 'Medium', image: 'https://static.wixstatic.com/media/7cdd40_e1f529d081584e02afe8535a89b3939b~mv2.png?originWidth=256&originHeight=192' },
              { name: 'Mosaic Virus', crop: 'Squash', severity: 'High', image: 'https://static.wixstatic.com/media/7cdd40_f50b3952d61b49fca70d585d93660777~mv2.png?originWidth=256&originHeight=192' }
            ].map((disease, index) => (
              <Card key={index} className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                <Image
                  src={disease.image}
                  alt={disease.name}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                  width={300}
                />
                <h3 className="font-heading font-semibold text-primary mb-1">{disease.name}</h3>
                <p className="text-sm font-paragraph text-gray-600 dark:text-gray-300 mb-2">
                  {t('affects')}: {disease.crop}
                </p>
                <div className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getSeverityColor(disease.severity.toLowerCase())}`}>
                  {t(disease.severity.toLowerCase())} {t('risk')}
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DiseaseDetectionPage;