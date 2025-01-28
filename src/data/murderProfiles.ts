export interface MurderProfile {
  id: string;
  name: string;
  age: number;
  gender: string;
  physicalDescription: {
    height: string;
    weight: string;
    hairColor: string;
    eyeColor: string;
    build: string;
  };
  knownAliases: string[];
  priorConvictions: string[];
  modusOperandi: {
    timeOfDay: string;
    dayOfWeek: string;
    locationType: string;
    entryMethod: string;
    toolsWeaponsUsed: string;
    targetSelection: string;
    escapeMethod: string;
    motive: string;
  };
}

export const murderProfiles: MurderProfile[] = [
  {
    id: "4",
    name: "Tommy Egan",
    age: 33,
    gender: "Male",
    physicalDescription: {
      height: "6'0\"",
      weight: "185 lbs",
      hairColor: "Black",
      eyeColor: "Brown",
      build: "Athletic"
    },
    knownAliases: ["Tommy"],
    priorConvictions: ["Robbery", "Aggravated Assault", "Murder"],
    modusOperandi: {
      timeOfDay: "Night",
      dayOfWeek: "Any",
      locationType: "Secluded Areas, Residences",
      entryMethod: "Force, Stealth",
      toolsWeaponsUsed: "Gun, Knife",
      targetSelection: "High-Value Targets, Threats",
      escapeMethod: "Car",
      motive: "Elimination of Threats, Power"
    }
  },
  // ... Other murder profiles from your dataset
];
