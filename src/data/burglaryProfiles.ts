export interface BurglaryProfile {
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
      locationType: string;
      entryMethod: string;
      weaponUsed: string;
      targetSelection: string;
      escapeMethod: string;
      motive: string;
    };
  };
}

export const burglaryProfiles: BurglaryProfile[] = [
  {
    id: "b1",
    name: "Silvia Jones",
    matchScore: 85,
    details: {
      age: 28,
      gender: "Female",
      description: "Known for sophisticated nighttime operations and careful planning.",
      physicalDescription: {
        height: "5'6\"",
        weight: "130 lbs",
        hairColor: "Black",
        eyeColor: "Brown",
        build: "Slim"
      },
      knownAliases: ["The Shadow", "Shiv"],
      priorOffenses: ["Burglary", "Theft"],
      modusOperandi: {
        timeOfDay: "Night",
        dayOfWeek: "Weekdays",
        locationType: "Residential",
        entryMethod: "Lockpicking",
        weaponUsed: "None",
        targetSelection: "Jewelry, Electronics",
        escapeMethod: "On Foot",
        motive: "Financial Gain"
      }
    }
  },
  {
    id: "b2",
    name: "John Smith",
    matchScore: 75,
    details: {
      age: 32,
      gender: "Male",
      description: "Specializes in commercial properties with sophisticated security systems.",
      physicalDescription: {
        height: "6'0\"",
        weight: "180 lbs",
        hairColor: "Brown",
        eyeColor: "Blue",
        build: "Athletic"
      },
      knownAliases: ["The Ghost"],
      priorOffenses: ["Burglary", "Grand Theft"],
      modusOperandi: {
        timeOfDay: "Night",
        dayOfWeek: "Any",
        locationType: "Commercial",
        entryMethod: "Security Bypass",
        weaponUsed: "None",
        targetSelection: "High-Value Electronics",
        escapeMethod: "Vehicle",
        motive: "Financial Gain"
      }
    }
  },
  {
    id: "b3",
    name: "Marcus Rodriguez",
    matchScore: 70,
    details: {
      age: 25,
      gender: "Male",
      description: "Quick and efficient burglar targeting residential areas.",
      physicalDescription: {
        height: "5'9\"",
        weight: "155 lbs",
        hairColor: "Black",
        eyeColor: "Brown",
        build: "Slim"
      },
      knownAliases: ["Quick Mark"],
      priorOffenses: ["Burglary", "Petty Theft"],
      modusOperandi: {
        timeOfDay: "Evening",
        dayOfWeek: "Weekends",
        locationType: "Residential",
        entryMethod: "Forced Entry",
        weaponUsed: "None",
        targetSelection: "Cash, Small Valuables",
        escapeMethod: "On Foot",
        motive: "Financial Gain"
      }
    }
  }
];