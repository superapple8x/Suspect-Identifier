import { FC } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type CrimeType = 
  // Misdemeanors
  | 'petty-theft'
  | 'vandalism'
  | 'public-intoxication'
  | 'simple-assault'
  | 'dui-first-offense'
  // Felonies
  | 'burglary'
  | 'robbery'
  | 'aggravated-assault'
  | 'grand-theft-auto'
  | 'murder';

interface CrimeTypeSelectorProps {
  selectedCrimeType: CrimeType;
  onCrimeTypeChange: (crimeType: CrimeType) => void;
}

export const CrimeTypeSelector: FC<CrimeTypeSelectorProps> = ({
  selectedCrimeType,
  onCrimeTypeChange,
}) => {
  return (
    <div className="p-6 rounded-lg bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
      <Select value={selectedCrimeType} onValueChange={onCrimeTypeChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Crime Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Misdemeanors</SelectLabel>
            <SelectItem value="petty-theft">Petty Theft</SelectItem>
            <SelectItem value="vandalism">Vandalism</SelectItem>
            <SelectItem value="public-intoxication">Public Intoxication</SelectItem>
            <SelectItem value="simple-assault">Simple Assault</SelectItem>
            <SelectItem value="dui-first-offense">DUI - First Offense</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Felonies</SelectLabel>
            <SelectItem value="burglary">Burglary</SelectItem>
            <SelectItem value="robbery">Robbery</SelectItem>
            <SelectItem value="aggravated-assault">Aggravated Assault</SelectItem>
            <SelectItem value="grand-theft-auto">Grand Theft Auto</SelectItem>
            <SelectItem value="murder">Murder</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};