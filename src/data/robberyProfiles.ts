export interface RobberyProfile {
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

export const robberyProfiles: RobberyProfile[] = [
  {
    id: "r1",
    name: "Omar Little",
    matchScore: 92,
    details: {
      age: 38,
      gender: "Male",
      description: "Known for targeting drug dealers with a strict code of conduct.",
      physicalDescription: {
        height: "6'2\"",
        weight: "180 lbs",
        hairColor: "Black",
        eyeColor: "Brown",
        build: "Lean"
      },
      knownAliases: ["Omar"],
      priorOffenses: ["Robbery", "Murder"],
      modusOperandi: {
        timeOfDay: "Day",
        dayOfWeek: "Any",
        locationType: "Drug Stashes",
        entryMethod: "Surprise",
        weaponUsed: "Shotgun",
        targetSelection: "Drug Dealers",
        escapeMethod: "On Foot",
        motive: "Financial Gain"
      }
    }
  },
  {
    id: "r2",
    name: "James Wilson",
    matchScore: 78,
    details: {
      age: 35,
      gender: "Male",
      description: "History of armed robberies targeting small businesses.",
      physicalDescription: {
        height: "5'11\"",
        weight: "175 lbs",
        hairColor: "Brown",
        eyeColor: "Green",
        build: "Medium"
      },
      knownAliases: ["Jimmy"],
      priorOffenses: ["Robbery", "Assault"],
      modusOperandi: {
        timeOfDay: "Night",
        dayOfWeek: "Weekdays",
        locationType: "Small Businesses",
        entryMethod: "Force",
        weaponUsed: "Handgun",
        targetSelection: "Cash Registers",
        escapeMethod: "Vehicle",
        motive: "Financial Gain"
      }
    }
  }
];