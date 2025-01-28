import { murderProfiles, MurderProfile } from './murderProfiles';
import { robberyProfiles, RobberyProfile } from './robberyProfiles';
import { burglaryProfiles, BurglaryProfile } from './burglaryProfiles';

export type CrimeProfile = MurderProfile | RobberyProfile | BurglaryProfile;

export type CrimeDatabase = {
  "Murder": MurderProfile[];
  "Robbery": RobberyProfile[];
  "Burglary": BurglaryProfile[];
  [key: string]: CrimeProfile[];
};

export const mockDatabase: CrimeDatabase = {
  "Murder": murderProfiles,
  "Robbery": robberyProfiles,
  "Burglary": burglaryProfiles
};