/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: chathistory
 * Interface for ChatHistory
 */
export interface ChatHistory {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  conversationId?: string;
  /** @wixFieldType text */
  userId?: string;
  /** @wixFieldType text */
  userMessage?: string;
  /** @wixFieldType text */
  aiResponse?: string;
  /** @wixFieldType datetime */
  timestamp?: Date | string;
}


/**
 * Collection ID: cropdiseases
 * Interface for CropDiseases
 */
export interface CropDiseases {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  diseaseName?: string;
  /** @wixFieldType image */
  diseaseImage?: string;
  /** @wixFieldType text */
  symptoms?: string;
  /** @wixFieldType text */
  causes?: string;
  /** @wixFieldType text */
  treatmentOptions?: string;
}


/**
 * Collection ID: crops
 * Interface for Crops
 */
export interface Crops {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  cropName?: string;
  /** @wixFieldType image */
  cropImage?: string;
  /** @wixFieldType text */
  plantingInstructions?: string;
  /** @wixFieldType text */
  careGuidelines?: string;
  /** @wixFieldType text */
  harvestingInformation?: string;
  /** @wixFieldType text */
  expectedYield?: string;
  /** @wixFieldType text */
  suitableRegionsIndia?: string;
}


/**
 * Collection ID: governmentschemes
 * Interface for GovernmentSchemes
 */
export interface GovernmentSchemes {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  schemeName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  benefits?: string;
  /** @wixFieldType text */
  eligibilityCriteria?: string;
  /** @wixFieldType text */
  applicationProcess?: string;
  /** @wixFieldType url */
  officialUrl?: string;
  /** @wixFieldType date */
  launchDate?: Date | string;
}


/**
 * Collection ID: pesticides
 * Interface for Pesticides
 */
export interface Pesticides {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  pesticideName?: string;
  /** @wixFieldType text */
  pesticideType?: string;
  /** @wixFieldType text */
  activeIngredients?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  targetCrops?: string;
  /** @wixFieldType text */
  applicationInstructions?: string;
  /** @wixFieldType text */
  safetyPrecautions?: string;
  /** @wixFieldType image */
  productImage?: string;
}


/**
 * Collection ID: pests
 * Interface for Pests
 */
export interface Pests {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  pestName?: string;
  /** @wixFieldType text */
  scientificName?: string;
  /** @wixFieldType text */
  pestDescription?: string;
  /** @wixFieldType text */
  identificationMethods?: string;
  /** @wixFieldType image */
  pestImage?: string;
  /** @wixFieldType text */
  damageCaused?: string;
  /** @wixFieldType text */
  organicManagement?: string;
  /** @wixFieldType text */
  chemicalManagement?: string;
  /** @wixFieldType text */
  affectedCrops?: string;
}


/**
 * Collection ID: soiltypes
 * Interface for SoilTypes
 */
export interface SoilTypes {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  soilTypeName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  keyProperties?: string;
  /** @wixFieldType text */
  geographicalDistribution?: string;
  /** @wixFieldType text */
  suitableCrops?: string;
  /** @wixFieldType text */
  healthImprovementRecommendations?: string;
  /** @wixFieldType image */
  soilImage?: string;
}


/**
 * Collection ID: watermanagementtechniques
 * Interface for WaterManagementTechniques
 */
export interface WaterManagementTechniques {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  techniqueName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  irrigationMethodType?: string;
  /** @wixFieldType text */
  benefits?: string;
  /** @wixFieldType text */
  conservationTips?: string;
  /** @wixFieldType text */
  applicableCrops?: string;
  /** @wixFieldType image */
  techniqueImage?: string;
}
