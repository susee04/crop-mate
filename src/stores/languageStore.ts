import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LanguageStore {
  currentLanguage: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Hero Section
    heroTitle: 'Your AI Farming Assistant',
    heroSubtitle: 'Get expert advice on crops, pests, soil, weather, and government schemes in your language',
    listening: 'Listening...',
    tapToSpeak: 'Tap to speak',
    
    // Categories
    crops: 'Crops',
    cropDescription: 'Learn about different crops, planting, and care',
    pests: 'Pests',
    pestDescription: 'Identify and manage crop pests effectively',
    soil: 'Soil',
    soilDescription: 'Understand soil types and improvement methods',
    weather: 'Weather',
    weatherDescription: 'Get location-based weather updates',
    schemes: 'Government Schemes',
    schemesDescription: 'Access government loans and agricultural schemes',
    market: 'Market Analysis',
    marketDescription: 'Analyze market demand for different crops',
    pesticides: 'Pesticides',
    pesticidesDescription: 'Find crop-specific pesticide information',
    water: 'Water Management',
    waterDescription: 'Learn efficient water usage and irrigation',
    diseaseDetection: 'Disease Detection',
    diseaseDescription: 'Upload images to detect crop diseases',
    
    // Weather
    currentWeather: 'Current Weather',
    temperature: 'Temperature',
    humidity: 'Humidity',
    windSpeed: 'Wind Speed',
    condition: 'Condition',
    
    // General
    exploreCategories: 'Explore Categories',
    aiAssistant: 'AI Assistant',
    aiDescription: 'Ask questions about farming, get personalized advice, and access expert knowledge in your preferred language',
    askQuestion: 'Ask a Question',
    learnMore: 'Learn More',
    
    // Footer
    footerDescription: 'Empowering Indian farmers with AI-powered agricultural assistance',
    features: 'Features',
    voiceAssistant: 'Voice Assistant',
    cropGuidance: 'Crop Guidance',
    pestManagement: 'Pest Management',
    weatherUpdates: 'Weather Updates',
    support: 'Support',
    helpCenter: 'Help Center',
    tutorials: 'Tutorials',
    contact: 'Contact',
    feedback: 'Feedback',
    languages: 'Languages',
    allRightsReserved: 'All rights reserved.',
    
    // Navigation
    home: 'Home',
    profile: 'Profile',
    settings: 'Settings',
    signIn: 'Sign In',
    signOut: 'Sign Out',
    
    // Chat
    chatHistory: 'Chat History',
    startChatting: 'Start Chatting',
    totalConversations: 'Total Conversations',
    todaysChats: "Today's Chats",
    daysActive: 'Days Active',
    
    // Common
    back: 'Back',
    noCropsFound: 'No crops found',
    noPestsFound: 'No pests found',
    noSoilTypesFound: 'No soil types found',
    noSchemesFound: 'No schemes found',
    noPesticidesFound: 'No pesticides found',
    noTechniquesFound: 'No techniques found',
    tryDifferentSearch: 'Try a different search',
    loading: 'Loading...',
    error: 'Error',
    retry: 'Retry',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    add: 'Add',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    
    // Crops
    cropName: 'Crop Name',
    plantingInstructions: 'Planting Instructions',
    careGuidelines: 'Care Guidelines',
    harvestingInfo: 'Harvesting Information',
    expectedYield: 'Expected Yield',
    suitableRegions: 'Suitable Regions',
    
    // Pests
    pestName: 'Pest Name',
    scientificName: 'Scientific Name',
    identification: 'Identification',
    damage: 'Damage Caused',
    organicManagement: 'Organic Management',
    chemicalManagement: 'Chemical Management',
    affectedCrops: 'Affected Crops',
    
    // Soil
    soilType: 'Soil Type',
    properties: 'Key Properties',
    distribution: 'Geographical Distribution',
    suitableCrops: 'Suitable Crops',
    improvements: 'Health Improvement Recommendations',
    
    // Government Schemes
    schemeName: 'Scheme Name',
    description: 'Description',
    benefits: 'Benefits',
    eligibility: 'Eligibility Criteria',
    applicationProcess: 'Application Process',
    officialUrl: 'Official Website',
    launchDate: 'Launch Date',
    
    // Pesticides
    pesticideName: 'Pesticide Name',
    pesticideType: 'Type',
    activeIngredients: 'Active Ingredients',
    targetCrops: 'Target Crops',
    applicationInstructions: 'Application Instructions',
    safetyPrecautions: 'Safety Precautions',
    
    // Water Management
    techniqueName: 'Technique Name',
    irrigationMethod: 'Irrigation Method',
    conservationTips: 'Conservation Tips',
    applicableCrops: 'Applicable Crops',
    
    // Disease Detection
    uploadImage: 'Upload Image',
    detectDisease: 'Detect Disease',
    symptoms: 'Symptoms',
    causes: 'Causes',
    treatment: 'Treatment Options',
  },
  ta: {
    // Hero Section
    heroTitle: 'உங்கள் AI விவசாய உதவியாளர்',
    heroSubtitle: 'பயிர்கள், பூச்சிகள், மண், வானிலை மற்றும் அரசு திட்டங்கள் பற்றிய நிபுணர் ஆலோசனையை உங்கள் மொழியில் பெறுங்கள்',
    listening: 'கேட்டுக்கொண்டிருக்கிறது...',
    tapToSpeak: 'பேச தட்டவும்',
    
    // Categories
    crops: 'பயிர்கள்',
    cropDescription: 'பல்வேறு பயிர்கள், நடவு மற்றும் பராமரிப்பு பற்றி அறியுங்கள்',
    pests: 'பூச்சிகள்',
    pestDescription: 'பயிர் பூச்சிகளை திறம்பட அடையாளம் கண்டு நிர்வகிக்கவும்',
    soil: 'மண்',
    soilDescription: 'மண் வகைகள் மற்றும் மேம்பாட்டு முறைகளை புரிந்துகொள்ளுங்கள்',
    weather: 'வானிலை',
    weatherDescription: 'இடம் சார்ந்த வானிலை புதுப்பிப்புகளை பெறுங்கள்',
    schemes: 'அரசு திட்டங்கள்',
    schemesDescription: 'அரசு கடன்கள் மற்றும் விவசாய திட்டங்களை அணுகவும்',
    market: 'சந்தை பகுப்பாய்வு',
    marketDescription: 'பல்வேறு பயிர்களுக்கான சந்தை தேவையை பகுப்பாய்வு செய்யுங்கள்',
    pesticides: 'பூச்சிக்கொல்லிகள்',
    pesticidesDescription: 'பயிர் சார்ந்த பூச்சிக்கொல்லி தகவல்களை கண்டறியுங்கள்',
    water: 'நீர் மேலாண்மை',
    waterDescription: 'திறமையான நீர் பயன்பாடு மற்றும் நீர்ப்பாசனம் கற்றுக்கொள்ளுங்கள்',
    diseaseDetection: 'நோய் கண்டறிதல்',
    diseaseDescription: 'பயிர் நோய்களை கண்டறிய படங்களை பதிவேற்றவும்',
    
    // Weather
    currentWeather: 'தற்போதைய வானிலை',
    temperature: 'வெப்பநிலை',
    humidity: 'ஈரப்பதம்',
    windSpeed: 'காற்றின் வேகம்',
    condition: 'நிலை',
    
    // General
    exploreCategories: 'வகைகளை ஆராயுங்கள்',
    aiAssistant: 'AI உதவியாளர்',
    aiDescription: 'விவசாயம் பற்றி கேள்விகள் கேளுங்கள், தனிப்பயனாக்கப்பட்ட ஆலோசனையை பெறுங்கள், மற்றும் உங்கள் விருப்பமான மொழியில் நிபுணர் அறிவை அணுகவும்',
    askQuestion: 'கேள்வி கேளுங்கள்',
    learnMore: 'மேலும் அறியுங்கள்',
    
    // Footer
    footerDescription: 'AI-இயங்கும் விவசாய உதவியுடன் இந்திய விவசாயிகளை மேம்படுத்துதல்',
    features: 'அம்சங்கள்',
    voiceAssistant: 'குரல் உதவியாளர்',
    cropGuidance: 'பயிர் வழிகாட்டுதல்',
    pestManagement: 'பூச்சி மேலாண்மை',
    weatherUpdates: 'வானிலை புதுப்பிப்புகள்',
    support: 'ஆதரவு',
    helpCenter: 'உதவி மையம்',
    tutorials: 'பயிற்சிகள்',
    contact: 'தொடர்பு',
    feedback: 'கருத்து',
    languages: 'மொழிகள்',
    allRightsReserved: 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
    
    // Navigation
    home: 'முகப்பு',
    profile: 'சுயவிவரம்',
    settings: 'அமைப்புகள்',
    signIn: 'உள்நுழைய',
    signOut: 'வெளியேறு',
    
    // Chat
    chatHistory: 'அரட்டை வரலாறு',
    startChatting: 'அரட்டை தொடங்கு',
    totalConversations: 'மொத்த உரையாடல்கள்',
    todaysChats: 'இன்றைய அரட்டைகள்',
    daysActive: 'செயல்பாட்டு நாட்கள்',
    
    // Common
    loading: 'ஏற்றுகிறது...',
    error: 'பிழை',
    retry: 'மீண்டும் முயற்சி',
    save: 'சேமி',
    cancel: 'ரத்து',
    delete: 'நீக்கு',
    edit: 'திருத்து',
    add: 'சேர்',
    search: 'தேடு',
    filter: 'வடிகட்டு',
    sort: 'வரிசைப்படுத்து',
    
    // Additional translations for Tamil...
    back: 'பின்னால்',
    noCropsFound: 'பயிர்கள் கிடைக்கவில்லை',
    noPestsFound: 'பூச்சிகள் கிடைக்கவில்லை',
    noSoilTypesFound: 'மண் வகைகள் கிடைக்கவில்லை',
    noSchemesFound: 'திட்டங்கள் கிடைக்கவில்லை',
    noPesticidesFound: 'பூச்சிக்கொல்லிகள் கிடைக்கவில்லை',
    noTechniquesFound: 'நுட்பங்கள் கிடைக்கவில்லை',
    tryDifferentSearch: 'வேறு தேடல் முயற்சி செய்யுங்கள்',
    cropName: 'பயிர் பெயர்',
    plantingInstructions: 'நடவு வழிமுறைகள்',
    careGuidelines: 'பராமரிப்பு வழிகாட்டுதல்கள்',
    harvestingInfo: 'அறுவடை தகவல்',
    expectedYield: 'எதிர்பார்க்கப்படும் விளைச்சல்',
    suitableRegions: 'பொருத்தமான பகுதிகள்',
    
    pestName: 'பூச்சி பெயர்',
    scientificName: 'அறிவியல் பெயர்',
    identification: 'அடையாளம்',
    damage: 'ஏற்படும் சேதம்',
    organicManagement: 'இயற்கை மேலாண்மை',
    chemicalManagement: 'இரசாயன மேலாண்மை',
    affectedCrops: 'பாதிக்கப்பட்ட பயிர்கள்',
    
    soilType: 'மண் வகை',
    properties: 'முக்கிய பண்புகள்',
    distribution: 'புவியியல் விநியோகம்',
    suitableCrops: 'பொருத்தமான பயிர்கள்',
    improvements: 'ஆரோக்கிய மேம்பாட்டு பரிந்துரைகள்',
    
    schemeName: 'திட்ட பெயர்',
    description: 'விவரம்',
    benefits: 'நன்மைகள்',
    eligibility: 'தகுதி நிபந்தனைகள்',
    applicationProcess: 'விண்ணப்ப செயல்முறை',
    officialUrl: 'அதிகாரப்பூர்வ இணையதளம்',
    launchDate: 'தொடக்க தேதி',
    
    pesticideName: 'பூச்சிக்கொல்லி பெயர்',
    pesticideType: 'வகை',
    activeIngredients: 'செயல்படும் பொருட்கள்',
    targetCrops: 'இலக்கு பயிர்கள்',
    applicationInstructions: 'பயன்பாட்டு வழிமுறைகள்',
    safetyPrecautions: 'பாதுகாப்பு முன்னெச்சரிக்கைகள்',
    
    techniqueName: 'நுட்ப பெயர்',
    irrigationMethod: 'நீர்ப்பாசன முறை',
    conservationTips: 'பாதுகாப்பு குறிப்புகள்',
    applicableCrops: 'பொருந்தும் பயிர்கள்',
    
    uploadImage: 'படம் பதிவேற்று',
    detectDisease: 'நோயை கண்டறி',
    symptoms: 'அறிகுறிகள்',
    causes: 'காரணங்கள்',
    treatment: 'சிகிச்சை விருப்பங்கள்',
  },
  te: {
    // Hero Section
    heroTitle: 'మీ AI వ్యవసాయ సహాయకుడు',
    heroSubtitle: 'మీ భాషలో పంటలు, చీడపురుగులు, మట్టి, వాతావరణం మరియు ప్రభుత్వ పథకాలపై నిపుణుల సలహా పొందండి',
    listening: 'వింటున్నాం...',
    tapToSpeak: 'మాట్లాడటానికి నొక్కండి',
    
    // Categories
    crops: 'పంటలు',
    cropDescription: 'వివిధ పంటలు, నాటడం మరియు సంరక్షణ గురించి తెలుసుకోండి',
    pests: 'చీడపురుగులు',
    pestDescription: 'పంట చీడపురుగులను సమర్థవంతంగా గుర్తించి నిర్వహించండి',
    soil: 'మట్టి',
    soilDescription: 'మట్టి రకాలు మరియు మెరుగుదల పద్ధతులను అర్థం చేసుకోండి',
    weather: 'వాతావరణం',
    weatherDescription: 'స్థాన ఆధారిత వాతావరణ నవీకరణలను పొందండి',
    schemes: 'ప్రభుత్వ పథకాలు',
    schemesDescription: 'ప్రభుత్వ రుణాలు మరియు వ్యవసాయ పథకాలను యాక్సెస్ చేయండి',
    market: 'మార్కెట్ విశ్లేషణ',
    marketDescription: 'వివిధ పంటలకు మార్కెట్ డిమాండ్‌ను విశ్లేషించండి',
    pesticides: 'పురుగుమందులు',
    pesticidesDescription: 'పంట-నిర్దిష్ట పురుగుమందు సమాచారాన్ని కనుగొనండి',
    water: 'నీటి నిర్వహణ',
    waterDescription: 'సమర్థవంతమైన నీటి వినియోగం మరియు నీటిపారుదల నేర్చుకోండి',
    diseaseDetection: 'వ్యాధి గుర్తింపు',
    diseaseDescription: 'పంట వ్యాధులను గుర్తించడానికి చిత్రాలను అప్‌లోడ్ చేయండి',
    
    // Weather
    currentWeather: 'ప్రస్తుత వాతావరణం',
    temperature: 'ఉష్ణోగ్రత',
    humidity: 'తేమ',
    windSpeed: 'గాలి వేగం',
    condition: 'స్థితి',
    
    // General
    exploreCategories: 'వర్గాలను అన్వేషించండి',
    aiAssistant: 'AI సహాయకుడు',
    aiDescription: 'వ్యవసాయం గురించి ప్రశ్నలు అడగండి, వ్యక్తిగతీకరించిన సలహా పొందండి మరియు మీ ఇష్టమైన భాషలో నిపుణుల జ్ఞానాన్ని యాక్సెస్ చేయండి',
    askQuestion: 'ప్రశ్న అడగండి',
    learnMore: 'మరింత తెలుసుకోండి',
    
    // Footer
    footerDescription: 'AI-శక్తితో కూడిన వ్యవసాయ సహాయంతో భారతీయ రైతులను శక్తివంతం చేయడం',
    features: 'లక్షణాలు',
    voiceAssistant: 'వాయిస్ అసిస్టెంట్',
    cropGuidance: 'పంట మార్గదర్శకత్వం',
    pestManagement: 'చీడపురుగుల నిర్వహణ',
    weatherUpdates: 'వాతావరణ నవీకరణలు',
    support: 'మద్దతు',
    helpCenter: 'సహాయ కేంద్రం',
    tutorials: 'ట్యుటోరియల్స్',
    contact: 'సంప్రదింపు',
    feedback: 'అభిప్రాయం',
    languages: 'భాషలు',
    allRightsReserved: 'అన్ని హక్కులు రక్షించబడ్డాయి.',
    
    // Navigation and other common terms
    home: 'హోమ్',
    profile: 'ప్రొఫైల్',
    settings: 'సెట్టింగ్స్',
    signIn: 'సైన్ ఇన్',
    signOut: 'సైన్ అవుట్',
    
    // Chat
    chatHistory: 'చాట్ చరిత్ర',
    startChatting: 'చాట్ ప్రారంభించండి',
    totalConversations: 'మొత్తం సంభాషణలు',
    todaysChats: 'నేటి చాట్‌లు',
    daysActive: 'క్రియాశీల దినాలు',
    
    loading: 'లోడ్ అవుతోంది...',
    error: 'లోపం',
    retry: 'మళ్లీ ప్రయత్నించండి',
    save: 'సేవ్',
    cancel: 'రద్దు',
    delete: 'తొలగించు',
    edit: 'సవరించు',
    add: 'జోడించు',
    search: 'వెతకండి',
    filter: 'ఫిల్టర్',
    sort: 'క్రమబద్ధీకరించు',
    
    // Additional Telugu translations...
    back: 'వెనుకకు',
    noCropsFound: 'పంటలు కనుగొనబడలేదు',
    noPestsFound: 'చీడపురుగులు కనుగొనబడలేదు',
    noSoilTypesFound: 'మట్టి రకాలు కనుగొనబడలేదు',
    noSchemesFound: 'పథకాలు కనుగొనబడలేదు',
    noPesticidesFound: 'పురుగుమందులు కనుగొనబడలేదు',
    noTechniquesFound: 'టెక్నిక్‌లు కనుగొనబడలేదు',
    tryDifferentSearch: 'వేరే వెతుకులాట ప్రయత్నించండి',
    cropName: 'పంట పేరు',
    plantingInstructions: 'నాటడం సూచనలు',
    careGuidelines: 'సంరక్షణ మార్గదర్శకాలు',
    harvestingInfo: 'కోత సమాచారం',
    expectedYield: 'ఆశించిన దిగుబడి',
    suitableRegions: 'అనుకూలమైన ప్రాంతాలు',
    
    pestName: 'చీడపురుగు పేరు',
    scientificName: 'శాస్త్రీయ నామం',
    identification: 'గుర్తింపు',
    damage: 'కలిగే నష్టం',
    organicManagement: 'సేంద్రీయ నిర్వహణ',
    chemicalManagement: 'రసాయన నిర్వహణ',
    affectedCrops: 'ప్రభావిత పంటలు',
    
    soilType: 'మట్టి రకం',
    properties: 'ముఖ్య లక్షణాలు',
    distribution: 'భౌగోళిక పంపిణీ',
    suitableCrops: 'అనుకూలమైన పంటలు',
    improvements: 'ఆరోగ్య మెరుగుదల సిఫార్సులు',
    
    schemeName: 'పథకం పేరు',
    description: 'వివరణ',
    benefits: 'ప్రయోజనాలు',
    eligibility: 'అర్హత ప్రమాణాలు',
    applicationProcess: 'దరఖాస్తు ప్రక్రియ',
    officialUrl: 'అధికారిక వెబ్‌సైట్',
    launchDate: 'ప్రారంభ తేదీ',
    
    pesticideName: 'పురుగుమందు పేరు',
    pesticideType: 'రకం',
    activeIngredients: 'క్రియాశీల పదార్థాలు',
    targetCrops: 'లక్ష్య పంటలు',
    applicationInstructions: 'అప్లికేషన్ సూచనలు',
    safetyPrecautions: 'భద్రతా జాగ్రత్తలు',
    
    techniqueName: 'టెక్నిక్ పేరు',
    irrigationMethod: 'నీటిపారుదల పద్ధతి',
    conservationTips: 'సంరక్షణ చిట్కాలు',
    applicableCrops: 'వర్తించే పంటలు',
    
    uploadImage: 'చిత్రం అప్‌లోడ్ చేయండి',
    detectDisease: 'వ్యాధిని గుర్తించండి',
    symptoms: 'లక్షణాలు',
    causes: 'కారణాలు',
    treatment: 'చికిత్స ఎంపికలు',
  },
  hi: {
    // Hero Section
    heroTitle: 'आपका AI कृषि सहायक',
    heroSubtitle: 'अपनी भाषा में फसलों, कीटों, मिट्टी, मौसम और सरकारी योजनाओं पर विशेषज्ञ सलाह प्राप्त करें',
    listening: 'सुन रहा है...',
    tapToSpeak: 'बोलने के लिए टैप करें',
    
    // Categories
    crops: 'फसलें',
    cropDescription: 'विभिन्न फसलों, रोपण और देखभाल के बारे में जानें',
    pests: 'कीट',
    pestDescription: 'फसल कीटों की पहचान और प्रभावी प्रबंधन करें',
    soil: 'मिट्टी',
    soilDescription: 'मिट्टी के प्रकार और सुधार के तरीकों को समझें',
    weather: 'मौसम',
    weatherDescription: 'स्थान-आधारित मौसम अपडेट प्राप्त करें',
    schemes: 'सरकारी योजनाएं',
    schemesDescription: 'सरकारी ऋण और कृषि योजनाओं तक पहुंचें',
    market: 'बाजार विश्लेषण',
    marketDescription: 'विभिन्न फसलों की बाजार मांग का विश्लेषण करें',
    pesticides: 'कीटनाशक',
    pesticidesDescription: 'फसल-विशिष्ट कीटनाशक जानकारी खोजें',
    water: 'जल प्रबंधन',
    waterDescription: 'कुशल जल उपयोग और सिंचाई सीखें',
    diseaseDetection: 'रोग पहचान',
    diseaseDescription: 'फसल रोगों की पहचान के लिए चित्र अपलोड करें',
    
    // Weather
    currentWeather: 'वर्तमान मौसम',
    temperature: 'तापमान',
    humidity: 'आर्द्रता',
    windSpeed: 'हवा की गति',
    condition: 'स्थिति',
    
    // General
    exploreCategories: 'श्रेणियों का अन्वेषण करें',
    aiAssistant: 'AI सहायक',
    aiDescription: 'खेती के बारे में प्रश्न पूछें, व्यक्तिगत सलाह प्राप्त करें, और अपनी पसंदीदा भाषा में विशेषज्ञ ज्ञान तक पहुंचें',
    askQuestion: 'प्रश्न पूछें',
    learnMore: 'और जानें',
    
    // Footer
    footerDescription: 'AI-संचालित कृषि सहायता के साथ भारतीय किसानों को सशक्त बनाना',
    features: 'विशेषताएं',
    voiceAssistant: 'वॉयस असिस्टेंट',
    cropGuidance: 'फसल मार्गदर्शन',
    pestManagement: 'कीट प्रबंधन',
    weatherUpdates: 'मौसम अपडेट',
    support: 'सहायता',
    helpCenter: 'सहायता केंद्र',
    tutorials: 'ट्यूटोरियल',
    contact: 'संपर्क',
    feedback: 'फीडबैक',
    languages: 'भाषाएं',
    allRightsReserved: 'सभी अधिकार सुरक्षित।',
    
    // Navigation
    home: 'होम',
    profile: 'प्रोफाइल',
    settings: 'सेटिंग्स',
    signIn: 'साइन इन',
    signOut: 'साइन आउट',
    
    // Chat
    chatHistory: 'चैट इतिहास',
    startChatting: 'चैट शुरू करें',
    totalConversations: 'कुल बातचीत',
    todaysChats: 'आज की चैट',
    daysActive: 'सक्रिय दिन',
    
    // Common
    loading: 'लोड हो रहा है...',
    error: 'त्रुटि',
    retry: 'पुनः प्रयास',
    save: 'सेव',
    cancel: 'रद्द',
    delete: 'हटाएं',
    edit: 'संपादित करें',
    add: 'जोड़ें',
    search: 'खोजें',
    filter: 'फिल्टर',
    sort: 'क्रमबद्ध करें',
    
    // Additional Hindi translations...
    back: 'वापस',
    noCropsFound: 'कोई फसलें नहीं मिलीं',
    noPestsFound: 'कोई कीट नहीं मिले',
    noSoilTypesFound: 'कोई मिट्टी के प्रकार नहीं मिले',
    noSchemesFound: 'कोई योजनाएं नहीं मिलीं',
    noPesticidesFound: 'कोई कीटनाशक नहीं मिले',
    noTechniquesFound: 'कोई तकनीकें नहीं मिलीं',
    tryDifferentSearch: 'अलग खोज का प्रयास करें',
    cropName: 'फसल का नाम',
    plantingInstructions: 'रोपण निर्देश',
    careGuidelines: 'देखभाल दिशानिर्देश',
    harvestingInfo: 'कटाई की जानकारी',
    expectedYield: 'अपेक्षित उपज',
    suitableRegions: 'उपयुक्त क्षेत्र',
    
    pestName: 'कीट का नाम',
    scientificName: 'वैज्ञानिक नाम',
    identification: 'पहचान',
    damage: 'होने वाला नुकसान',
    organicManagement: 'जैविक प्रबंधन',
    chemicalManagement: 'रासायनिक प्रबंधन',
    affectedCrops: 'प्रभावित फसलें',
    
    soilType: 'मिट्टी का प्रकार',
    properties: 'मुख्य गुण',
    distribution: 'भौगोलिक वितरण',
    suitableCrops: 'उपयुक्त फसलें',
    improvements: 'स्वास्थ्य सुधार सिफारिशें',
    
    schemeName: 'योजना का नाम',
    description: 'विवरण',
    benefits: 'लाभ',
    eligibility: 'पात्रता मानदंड',
    applicationProcess: 'आवेदन प्रक्रिया',
    officialUrl: 'आधिकारिक वेबसाइट',
    launchDate: 'लॉन्च तारीख',
    
    pesticideName: 'कीटनाशक का नाम',
    pesticideType: 'प्रकार',
    activeIngredients: 'सक्रिय तत्व',
    targetCrops: 'लक्षित फसलें',
    applicationInstructions: 'उपयोग निर्देश',
    safetyPrecautions: 'सुरक्षा सावधानियां',
    
    techniqueName: 'तकनीक का नाम',
    irrigationMethod: 'सिंचाई विधि',
    conservationTips: 'संरक्षण सुझाव',
    applicableCrops: 'लागू फसलें',
    
    uploadImage: 'चित्र अपलोड करें',
    detectDisease: 'रोग की पहचान करें',
    symptoms: 'लक्षण',
    causes: 'कारण',
    treatment: 'उपचार विकल्प',
  }
};

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set, get) => ({
      currentLanguage: 'en',
      setLanguage: (language: string) => set({ currentLanguage: language }),
      t: (key: string) => {
        const { currentLanguage } = get();
        const translation = translations[currentLanguage as keyof typeof translations];
        return translation?.[key as keyof typeof translation] || translations.en[key as keyof typeof translations.en] || key;
      },
    }),
    {
      name: 'language-storage',
    }
  )
);