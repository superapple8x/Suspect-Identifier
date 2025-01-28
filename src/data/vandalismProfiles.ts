interface VandalismProfile {
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
      locationType: string; // e.g. schools, public buildings, private property
      toolsUsed: string; // e.g. spray paint, markers, etching tools
      damageType: string; // e.g. graffiti, breaking windows, etching
      targetPreference: string; // e.g. walls, vehicles, windows
      groupActivity: string; // e.g. solo, small group, gang-related
      signature: string; // e.g. specific tags, symbols, or patterns
      escapeMethod: string;
      motive: string; // e.g. artistic expression, gang territory, rebellion
    };
  };
}

export const vandalismProfiles: VandalismProfile[] = [
  {
    id: 'v001',
    name: 'Mike Thompson',
    matchScore: 0,
    details: {
      age: 19,
      gender: 'male',
      description: 'Known for elaborate graffiti artwork in urban areas',
      physicalDescription: {
        height: "5'10\"",
        weight: '155 lbs',
        hairColor: 'black',
        eyeColor: 'brown',
        build: 'athletic'
      },
      knownAliases: ['Ghost', 'MTX'],
      priorOffenses: ['Graffiti', 'Trespassing'],
      modusOperandi: {
        timeOfDay: 'late night',
        dayOfWeek: 'weekends',
        locationType: 'abandoned buildings',
        toolsUsed: 'spray paint and stencils',
        damageType: 'large-scale graffiti murals',
        targetPreference: 'concrete walls',
        groupActivity: 'solo',
        signature: 'ghost-themed artwork',
        escapeMethod: 'parkour across rooftops',
        motive: 'artistic expression'
      }
    }
  },
  {
    id: 'v002',
    name: 'Sarah Chen',
    matchScore: 0,
    details: {
      age: 17,
      gender: 'female',
      description: 'Targets school properties with political messages',
      physicalDescription: {
        height: "5'6\"",
        weight: '125 lbs',
        hairColor: 'dark brown',
        eyeColor: 'brown',
        build: 'slim'
      },
      knownAliases: ['Rebel'],
      priorOffenses: ['Vandalism', 'Disturbing the Peace'],
      modusOperandi: {
        timeOfDay: 'after school hours',
        dayOfWeek: 'weekdays',
        locationType: 'school buildings',
        toolsUsed: 'markers and stickers',
        damageType: 'political slogans and symbols',
        targetPreference: 'school walls and lockers',
        groupActivity: 'small group',
        signature: 'anti-establishment messages',
        escapeMethod: 'blending with student crowds',
        motive: 'political protest'
      }
    }
  },
  {
    id: 'v003',
    name: 'Marcus Rodriguez',
    matchScore: 0,
    details: {
      age: 22,
      gender: 'male',
      description: 'Specializes in vehicle vandalism',
      physicalDescription: {
        height: "5'11\"",
        weight: '170 lbs',
        hairColor: 'brown',
        eyeColor: 'hazel',
        build: 'muscular'
      },
      knownAliases: ['Scratch'],
      priorOffenses: ['Vehicle Vandalism', 'Petty Theft'],
      modusOperandi: {
        timeOfDay: 'midnight',
        dayOfWeek: 'random',
        locationType: 'parking lots',
        toolsUsed: 'keys and sharp objects',
        damageType: 'vehicle scratching and tire slashing',
        targetPreference: 'luxury vehicles',
        groupActivity: 'duo',
        signature: 'zigzag scratch pattern',
        escapeMethod: 'getaway vehicle',
        motive: 'revenge against wealthy'
      }
    }
  }
];