import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, Flag } from "lucide-react";

const crimeTypes = {
  misdemeanors: [
    "Petty Theft",
    "Vandalism",
    "Public Intoxication",
    "Simple Assault",
    "DUI - First Offense"
  ],
  felonies: [
    "Burglary",
    "Robbery",
    "Aggravated Assault",
    "Grand Theft Auto",
    "Murder"
  ]
};

interface CrimeTypeSelectProps {
  onSelect: (value: string) => void;
}

export function CrimeTypeSelect({ onSelect }: CrimeTypeSelectProps) {
  const [selectedCategory, setSelectedCategory] = useState<"misdemeanors" | "felonies" | null>(null);
  const [selectedCrime, setSelectedCrime] = useState<string | null>(null);

  const handleCategoryClick = (category: "misdemeanors" | "felonies") => {
    setSelectedCategory(category);
    setSelectedCrime(null); // Reset selected crime when changing category
  };

  const handleCrimeSelect = (crime: string) => {
    setSelectedCrime(crime);
    onSelect(crime);
  };

  return (
    <div className="space-y-8 w-full max-w-4xl mx-auto fade-in">
      {/* Progress Steps */}
      <div className="flex justify-between mb-8">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-primary text-white">1. Crime Type</Badge>
          <Badge variant="outline" className="text-muted-foreground">2. Details</Badge>
          <Badge variant="outline" className="text-muted-foreground">3. Results</Badge>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Select Crime Category</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Misdemeanor Card */}
          <Card 
            className={`p-6 cursor-pointer transition-all hover:border-primary ${
              selectedCategory === 'misdemeanors' ? 'border-primary' : 'border-border'
            }`}
            onClick={() => handleCategoryClick('misdemeanors')}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-full bg-primary/10">
                <Flag className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Misdemeanor</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Minor offenses like vandalism or trespassing
            </p>
            
            {selectedCategory === 'misdemeanors' && (
              <div className="mt-6 space-y-2 animate-fadeIn">
                {crimeTypes.misdemeanors.map((crime) => (
                  <div
                    key={crime}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCrimeSelect(crime);
                    }}
                    className={`p-2 rounded-md hover:bg-secondary/50 cursor-pointer transition-colors ${
                      selectedCrime === crime ? 'bg-secondary' : ''
                    }`}
                  >
                    {crime}
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Felony Card */}
          <Card 
            className={`p-6 cursor-pointer transition-all hover:border-primary ${
              selectedCategory === 'felonies' ? 'border-primary' : 'border-border'
            }`}
            onClick={() => handleCategoryClick('felonies')}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-full bg-accent/10">
                <Lock className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold">Felony</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Serious crimes like burglary or assault
            </p>
            
            {selectedCategory === 'felonies' && (
              <div className="mt-6 space-y-2 animate-fadeIn">
                {crimeTypes.felonies.map((crime) => (
                  <div
                    key={crime}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCrimeSelect(crime);
                    }}
                    className={`p-2 rounded-md hover:bg-secondary/50 cursor-pointer transition-colors ${
                      selectedCrime === crime ? 'bg-secondary' : ''
                    }`}
                  >
                    {crime}
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}