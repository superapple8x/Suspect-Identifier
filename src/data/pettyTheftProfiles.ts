export interface PredictiveParameters {
  temporalPatterns: {
    timeOfDay: string[];
    dayOfWeek: string[];
    seasonalVariation: number[]; // [spring, summer, fall, winter] probabilities
    historicalPatterns: {
      frequency: number; // crimes per month
      intervalConsistency: number; // 0-1 scale
      escalationTrend: number; // 0-1 scale
    };
  };
  environmentalFactors: {
    locationTypeWeights: Record<string, number>; // Weights for different locations
    locationPreferenceWeights: {
      accessibility: number;
      securityLevel: number;
      escapeRoutes: number;
    };
    weatherConditions: string[];
    weatherCorrelations: {
      temperatureRange: [number, number];
      precipitationProbability: number;
      visibilityImpact: number;
    };
    crowdDensity: number; // 0-1 scale
  };
  behavioralMarkers: {
    escalationPattern: number; // 0-1 scale
    modusOperandiConsistency: number; // 0-1 scale
    recidivismProbability: number; // 0-1 scale
    psychologicalProfile: {
      riskTaking: number;
      impulsivity: number;
      organizationLevel: number;
    };
  };
  networkAnalysis: {
    associateConnections: number;
    networkDensity: number;
    influenceScore: number;
  };
}

export interface PettyTheftProfile {
  id: string;
  name: string;
  matchScore: number;
  predictiveParameters: {
     temporalPatterns: {
       timeOfDay: string[];
       dayOfWeek: string[];
       seasonalVariation: number[];
     };
     environmentalFactors: {
       locationTypeWeights: Record<string, number>;
       weatherConditions: string[];
       crowdDensity: number;
     };
     behavioralMarkers: {
       escalationPattern: number;
       modusOperandiConsistency: number;
       recidivismProbability: number;
     };
  };
  details: {
    age: number;
    gender: string;
    physicalDescription: {
      height: string;
      weight: string;
      build: string;
      distinguishingFeatures?: string[];
    };
    priorOffenses: {
      type: string;
      date: string;
      location: string;
      method: string;
    }[];
    modusOperandi: {
      targetPreference: string[];
      concealmentMethods: string[];
      distractionTechniques: string[];
      escapePatterns: string[];
      commonTools: string[];
    };
    associates?: string[];
    knownLocations: string[];
    psychologicalProfile?: {
      riskTaking: number;
      impulsivity: number;
      organizationLevel: number;
    };
  };
}

export const pettyTheftProfiles: PettyTheftProfile[] = [
  {
    id: "PT001",
    name: "John Doe",
    matchScore: 0,
    predictiveParameters: {
      temporalPatterns: {
        timeOfDay: ["afternoon", "evening"],
        dayOfWeek: ["monday", "friday", "saturday"],
        seasonalVariation: [0.3, 0.8, 0.6, 0.4] // Higher activity in summer
      },
      environmentalFactors: {
        locationTypeWeights: {
          "shopping_mall": 0.9,
          "retail_store": 0.7,
          "public_transport": 0.4,
          "parking_lot": 0.3
        },
        weatherConditions: ["clear", "cloudy"],
        crowdDensity: 0.8 // Prefers crowded areas
      },
      behavioralMarkers: {
        escalationPattern: 0.4,
        modusOperandiConsistency: 0.85,
        recidivismProbability: 0.7
      }
    },
    details: {
      age: 28,
      gender: "male",
      physicalDescription: {
        height: "5'10\"",
        weight: "165 lbs",
        build: "medium",
        distinguishingFeatures: ["small scar on right hand"]
      },
      priorOffenses: [
        {
          type: "shoplifting",
          date: "2024-12-15",
          location: "Central Mall",
          method: "concealment in modified jacket"
        },
        {
          type: "pickpocketing",
          date: "2024-11-03",
          location: "Metro Station",
          method: "bump and grab"
        }
      ],
      modusOperandi: {
        targetPreference: ["wallets", "smartphones", "designer accessories"],
        concealmentMethods: ["modified clothing", "shopping bags"],
        distractionTechniques: ["bumping", "asking for directions"],
        escapePatterns: ["blending with crowd", "using service exits"],
        commonTools: ["modified jacket", "foil-lined bag"]
      },
      associates: ["PT004", "PT007"],
      knownLocations: ["Central Mall", "West Shopping District", "Downtown Metro"],
      psychologicalProfile: {
        riskTaking: 0.6,
        impulsivity: 0.4,
        organizationLevel: 0.8
      }
    }
  },
  {
    id: "PT002",
    name: "Jane Smith",
    matchScore: 0,
    predictiveParameters: {
      temporalPatterns: {
        timeOfDay: ["morning", "afternoon"],
        dayOfWeek: ["tuesday", "wednesday", "thursday"],
        seasonalVariation: [0.6, 0.4, 0.7, 0.5] // More active in spring and fall
      },
      environmentalFactors: {
        locationTypeWeights: {
          "retail_store": 0.9,
          "shopping_mall": 0.6,
          "department_store": 0.8,
          "boutique": 0.7
        },
        weatherConditions: ["clear", "cloudy", "light_rain"],
        crowdDensity: 0.4 // Prefers moderate crowds
      },
      behavioralMarkers: {
        escalationPattern: 0.3,
        modusOperandiConsistency: 0.9,
        recidivismProbability: 0.6
      }
    },
    details: {
      age: 34,
      gender: "female",
      physicalDescription: {
        height: "5'6\"",
        weight: "130 lbs",
        build: "slim",
        distinguishingFeatures: ["designer glasses"]
      },
      priorOffenses: [
        {
          type: "shoplifting",
          date: "2024-12-28",
          location: "Luxury Boutique",
          method: "price tag switching"
        },
        {
          type: "retail theft",
          date: "2024-11-15",
          location: "Department Store",
          method: "fitting room concealment"
        }
      ],
      modusOperandi: {
        targetPreference: ["designer clothing", "jewelry", "cosmetics"],
        concealmentMethods: ["large designer bags", "fitting room techniques"],
        distractionTechniques: ["engaging staff in conversation", "multiple item try-on"],
        escapePatterns: ["casual exit", "multiple store visits"],
        commonTools: ["tag removal tool", "modified shopping bags"]
      },
      associates: ["PT009"],
      knownLocations: ["Fashion District", "Uptown Mall", "Designer Row"],
      psychologicalProfile: {
        riskTaking: 0.4,
        impulsivity: 0.3,
        organizationLevel: 0.9
      }
    }
  }
];