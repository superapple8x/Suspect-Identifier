interface PettyTheftProfile {
  id: string;
  name: string;
  matchScore: number;
  details: {
    age: number;
    gender: string;
    description: string;
    physicalDescription: {
      height: string;
      weight: string;
      hairColor: string;
      eyeColor: string;
      build: string;
    };
    knownAliases: string[];
    priorOffenses: string[];
    modusOperandi: {
      timeOfDay: string;
      dayOfWeek: string;
      locationType: string; // e.g. retail store, parking lot, public transport
      targetType: string; // e.g. wallets, phones, small electronics
      concealmentMethod: string; // e.g. pockets, bags, clothing
      distractionTechnique: string; // e.g. bumping, asking for help
      escapeMethod: string;
      motive: string; // e.g. drug money, thrill, necessity
    };
  };
}

export const pettyTheftProfiles: PettyTheftProfile[] = [
  {
    id: 'pt001',
    name: 'John Doe',
    matchScore: 0,
    details: {
      age: 32,
      gender: 'male',
      description: 'Known for targeting crowded areas',
      physicalDescription: {
        height: "5'9\"",
        weight: '160 lbs',
        hairColor: 'brown',
        eyeColor: 'blue',
        build: 'average'
      },
      knownAliases: ['Johnny', 'JD'],
      priorOffenses: ['Shoplifting', 'Pickpocketing'],
      modusOperandi: {
        timeOfDay: 'afternoon',
        dayOfWeek: 'weekdays',
        locationType: 'shopping malls',
        targetType: 'wallets',
        concealmentMethod: 'jacket pockets',
        distractionTechnique: 'bumping into victims',
        escapeMethod: 'blending into crowd',
        motive: 'drug money'
      }
    }
  },
  {
    id: 'pt002',
    name: 'Jane Smith',
    matchScore: 0,
    details: {
      age: 28,
      gender: 'female',
      description: 'Specializes in stealing from unlocked cars',
      physicalDescription: {
        height: "5'4\"",
        weight: '120 lbs',
        hairColor: 'blonde',
        eyeColor: 'green',
        build: 'slim'
      },
      knownAliases: ['Janey'],
      priorOffenses: ['Car break-ins', 'Shoplifting'],
      modusOperandi: {
        timeOfDay: 'evening',
        dayOfWeek: 'weekends',
        locationType: 'parking lots',
        targetType: 'small electronics',
        concealmentMethod: 'purse',
        distractionTechnique: 'none',
        escapeMethod: 'quick getaway',
        motive: 'thrill'
      }
    }
  }
];