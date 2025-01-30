import { MurderProfile } from "@/data/murderProfiles";
import { RobberyProfile } from "@/data/robberyProfiles";
import { BurglaryProfile } from "@/data/burglaryProfiles";
import { PettyTheftProfile } from "@/data/pettyTheftProfiles";

export interface ScoringWeights {
  physical: {
    height: number;
    build: number;
    hairColor: number;
    eyeColor: number;
  };
  demographics: {
    age: number;
    gender: number;
  };
  modusOperandi: {
    locationType: number;
    weapons: number;
    timePatterns: number;
    entryMethods: number;
  };
  targeting: {
    victimType: number;
    geography: number;
  };
  history: {
    priorOffenses: number;
    escalation: number;
    criminalNetwork: number;
    geoNetwork: number;
  };
}

export interface SearchCriteria {
  category: string;
  value: string;
}

export const DEFAULT_WEIGHTS: ScoringWeights = {
  physical: {
    height: 5,
    build: 5,
    hairColor: 5,
    eyeColor: 5,
  },
  demographics: {
    age: 10,
    gender: 10,
  },
  modusOperandi: {
    locationType: 5,
    weapons: 5,
    timePatterns: 5,
    entryMethods: 5,
  },
  targeting: {
    victimType: 10,
    geography: 5,
  },
  history: {
    priorOffenses: 10,
    escalation: 5,
    criminalNetwork: 5,
    geoNetwork: 5,
  },
};

type Suspect = MurderProfile | RobberyProfile | BurglaryProfile | PettyTheftProfile;

export interface ScoreBreakdown {
  physical: {
    height: number;
    build: number;
    hairColor: number;
    eyeColor: number;
  };
  demographics: {
    age: number;
    gender: number;
  };
  modusOperandi: {
    locationType: number;
    weapons: number;
  };
}

export class SuspectScorer {
  private weights: ScoringWeights;

  constructor(weights: ScoringWeights = DEFAULT_WEIGHTS) {
    this.weights = weights;
  }

  getScoreBreakdown(suspect: Suspect, criteria: SearchCriteria[]): ScoreBreakdown {
    return {
      physical: {
        height: this.calculateHeightScore(suspect, criteria.find(c => c.category.toLowerCase() === 'height')?.value || '') / this.weights.physical.height,
        build: this.calculateBuildScore(suspect, criteria.find(c => c.category.toLowerCase() === 'build')?.value || '') / this.weights.physical.build,
        hairColor: this.calculateHairScore(suspect, criteria.find(c => c.category.toLowerCase() === 'hair')?.value || '') / this.weights.physical.hairColor,
        eyeColor: this.calculateEyeScore(suspect, criteria.find(c => c.category.toLowerCase() === 'eyes')?.value || '') / this.weights.physical.eyeColor
      },
      demographics: {
        age: this.calculateAgeScore(suspect, criteria.find(c => c.category.toLowerCase() === 'age')?.value || '') / this.weights.demographics.age,
        gender: this.calculateGenderScore(suspect, criteria.find(c => c.category.toLowerCase() === 'gender')?.value || '') / this.weights.demographics.gender
      },
      modusOperandi: {
        locationType: this.calculateLocationScore(suspect, criteria.find(c => c.category.toLowerCase() === 'location')?.value || '') / this.weights.modusOperandi.locationType,
        weapons: this.calculateWeaponScore(suspect, criteria.find(c => c.category.toLowerCase() === 'weapon')?.value || '') / this.weights.modusOperandi.weapons
      }
    };
  }

  calculateScore(suspect: Suspect, criteria: SearchCriteria[]): number {
    let totalScore = 0;
    let maxPossibleScore = 0;

    criteria.forEach(criterion => {
      const { category, value } = criterion;
      let score = 0;
      let maxScore = 0;

      switch (category.toLowerCase()) {
        case 'height':
          score = this.calculateHeightScore(suspect, value);
          maxScore = this.weights.physical.height;
          break;
        case 'build':
          score = this.calculateBuildScore(suspect, value);
          maxScore = this.weights.physical.build;
          break;
        case 'hair':
          score = this.calculateHairScore(suspect, value);
          maxScore = this.weights.physical.hairColor;
          break;
        case 'eyes':
          score = this.calculateEyeScore(suspect, value);
          maxScore = this.weights.physical.eyeColor;
          break;
        case 'age':
          score = this.calculateAgeScore(suspect, value);
          maxScore = this.weights.demographics.age;
          break;
        case 'gender':
          score = this.calculateGenderScore(suspect, value);
          maxScore = this.weights.demographics.gender;
          break;
        case 'location':
          score = this.calculateLocationScore(suspect, value);
          maxScore = this.weights.modusOperandi.locationType;
          break;
        case 'weapon':
          score = this.calculateWeaponScore(suspect, value);
          maxScore = this.weights.modusOperandi.weapons;
          break;
        case 'motive':
          score = this.calculateMotiveScore(suspect, value);
          maxScore = this.weights.targeting.victimType;
          break;
      }

      totalScore += score;
      maxPossibleScore += maxScore;
    });

    return maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 0;
  }

  private calculateHeightScore(suspect: Suspect, targetHeight: string): number {
    const suspectHeight = 'priorConvictions' in suspect
      ? suspect.physicalDescription.height
      : suspect.details.physicalDescription.height;

    if (suspectHeight === targetHeight) {
      return this.weights.physical.height;
    }

    const suspectInches = this.heightToInches(suspectHeight);
    const targetInches = this.heightToInches(targetHeight);
    const difference = Math.abs(suspectInches - targetInches);

    if (difference <= 2) {
      return this.weights.physical.height * 0.6;
    } else if (difference <= 4) {
      return this.weights.physical.height * 0.3;
    }

    return 0;
  }

  private calculateBuildScore(suspect: Suspect, targetBuild: string): number {
    const suspectBuild = 'priorConvictions' in suspect
      ? suspect.physicalDescription.build.toLowerCase()
      : suspect.details.physicalDescription.build.toLowerCase();

    if (suspectBuild === targetBuild.toLowerCase()) {
      return this.weights.physical.build;
    }

    const similarBuilds = {
      'athletic': ['medium'],
      'medium': ['athletic', 'large'],
      'large': ['medium'],
      'slim': ['medium']
    };

    if (similarBuilds[suspectBuild]?.includes(targetBuild.toLowerCase())) {
      return this.weights.physical.build * 0.5;
    }

    return 0;
  }

  private calculateHairScore(suspect: Suspect, targetHair: string): number {
    const suspectHair = 'priorConvictions' in suspect
      ? suspect.physicalDescription.hairColor.toLowerCase()
      : suspect.details.physicalDescription.hairColor.toLowerCase();

    if (suspectHair === targetHair.toLowerCase()) {
      return this.weights.physical.hairColor;
    }

    return 0;
  }

  private calculateEyeScore(suspect: Suspect, targetEyes: string): number {
    const suspectEyes = 'priorConvictions' in suspect
      ? suspect.physicalDescription.eyeColor.toLowerCase()
      : suspect.details.physicalDescription.eyeColor.toLowerCase();

    if (suspectEyes === targetEyes.toLowerCase()) {
      return this.weights.physical.eyeColor;
    }

    return 0;
  }

  private calculateAgeScore(suspect: Suspect, targetAge: string): number {
    const suspectAge = 'priorConvictions' in suspect
      ? suspect.age
      : suspect.details.age;

    if (targetAge.includes('-')) {
      const [minAge, maxAge] = targetAge.split('-').map(Number);
      if (suspectAge >= minAge && suspectAge <= maxAge) {
        return this.weights.demographics.age;
      }
      const buffer = 5;
      if (suspectAge >= minAge - buffer && suspectAge <= maxAge + buffer) {
        return this.weights.demographics.age * 0.5;
      }
    } else {
      const age = parseInt(targetAge);
      if (suspectAge === age) {
        return this.weights.demographics.age;
      }
      if (Math.abs(suspectAge - age) <= 5) {
        return this.weights.demographics.age * 0.5;
      }
    }

    return 0;
  }

  private calculateGenderScore(suspect: Suspect, targetGender: string): number {
    const suspectGender = 'priorConvictions' in suspect
      ? suspect.gender.toLowerCase()
      : suspect.details.gender.toLowerCase();

    if (suspectGender === targetGender.toLowerCase()) {
      return this.weights.demographics.gender;
    }

    return 0;
  }

  private calculateLocationScore(suspect: Suspect, targetLocation: string): number {
    const suspectLocation = 'priorConvictions' in suspect
      ? suspect.modusOperandi.locationType.toLowerCase()
      : suspect.details.modusOperandi.locationType.toLowerCase();

    if (suspectLocation.includes(targetLocation.toLowerCase())) {
      return this.weights.modusOperandi.locationType;
    }

    const similarLocations = {
      'residential': ['house', 'apartment', 'home'],
      'commercial': ['store', 'office', 'business'],
      'public': ['street', 'park', 'plaza']
    };

    for (const [key, values] of Object.entries(similarLocations)) {
      if (suspectLocation.includes(key) && values.some(v => targetLocation.toLowerCase().includes(v)) ||
          values.some(v => suspectLocation.includes(v)) && targetLocation.toLowerCase().includes(key)) {
        return this.weights.modusOperandi.locationType * 0.5;
      }
    }

    return 0;
  }

  private calculateWeaponScore(suspect: Suspect, targetWeapon: string): number {
    let suspectWeapon = '';

    if ('priorConvictions' in suspect) {
      // Murder profile
      suspectWeapon = suspect.modusOperandi.toolsWeaponsUsed.toLowerCase();
    } else if ('details' in suspect) {
      const modusOperandi = suspect.details.modusOperandi;
      // Check if it's a petty theft profile by checking for concealmentMethod
      if ('concealmentMethod' in modusOperandi) {
        suspectWeapon = modusOperandi.concealmentMethod.toLowerCase();
      } else if ('weaponUsed' in modusOperandi) {
        suspectWeapon = modusOperandi.weaponUsed.toLowerCase();
      }
    }

    if (!suspectWeapon) {
      return 0;
    }

    if (suspectWeapon.includes(targetWeapon.toLowerCase())) {
      return this.weights.modusOperandi.weapons;
    }

    const similarWeapons = {
      'gun': ['firearm', 'pistol', 'rifle'],
      'knife': ['blade', 'dagger', 'sharp object'],
      'blunt': ['bat', 'club', 'pipe'],
      'concealment': ['pocket', 'bag', 'jacket', 'clothing']
    };

    for (const [key, values] of Object.entries(similarWeapons)) {
      if (suspectWeapon.includes(key) && values.some(v => targetWeapon.toLowerCase().includes(v)) ||
          values.some(v => suspectWeapon.includes(v)) && targetWeapon.toLowerCase().includes(key)) {
        return this.weights.modusOperandi.weapons * 0.5;
      }
    }

    return 0;
  }

  private calculateMotiveScore(suspect: Suspect, targetMotive: string): number {
    const suspectMotive = 'priorConvictions' in suspect
      ? suspect.modusOperandi.motive.toLowerCase()
      : suspect.details.modusOperandi.motive.toLowerCase();

    if (suspectMotive.includes(targetMotive.toLowerCase())) {
      return this.weights.targeting.victimType;
    }

    const similarMotives = {
      'financial': ['money', 'gain', 'profit'],
      'revenge': ['vengeance', 'retaliation', 'payback'],
      'power': ['control', 'dominance', 'influence']
    };

    for (const [key, values] of Object.entries(similarMotives)) {
      if (suspectMotive.includes(key) && values.some(v => targetMotive.toLowerCase().includes(v)) ||
          values.some(v => suspectMotive.includes(v)) && targetMotive.toLowerCase().includes(key)) {
        return this.weights.targeting.victimType * 0.5;
      }
    }

    return 0;
  }

  private heightToInches(height: string): number {
    const match = height.match(/(\d)'(\d{1,2})/);
    if (match) {
      const feet = parseInt(match[1]);
      const inches = parseInt(match[2]);
      return feet * 12 + inches;
    }
    return 0;
  }
}