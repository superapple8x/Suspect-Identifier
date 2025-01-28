import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SuspectResults } from "@/components/SuspectResults";
import { mockDatabase } from "@/data/mockDatabase";
import { MurderProfile } from "@/data/murderProfiles";
import { RobberyProfile } from "@/data/robberyProfiles";
import { BurglaryProfile } from "@/data/burglaryProfiles";
import { SuspectScorer, SearchCriteria } from "@/lib/SuspectScorer";

interface TagSearchProps {
  onReset: () => void;
}

type TagCategory = 
  | "crime" 
  | "age" 
  | "gender" 
  | "height" 
  | "build" 
  | "hair" 
  | "eyes" 
  | "motive"
  | "weapon"
  | "location";

const availableTags: Record<TagCategory, string[]> = {
  crime: ["Murder", "Robbery", "Burglary"],
  age: ["20-30", "31-40", "41-50", "51+"],
  gender: ["Male", "Female"],
  height: ["5'0\"-5'6\"", "5'7\"-5'11\"", "6'0\"+"],
  build: ["Slim", "Athletic", "Medium", "Large"],
  hair: ["Black", "Brown", "Blonde", "Red", "Gray"],
  eyes: ["Brown", "Blue", "Green", "Hazel"],
  motive: ["Financial Gain", "Power", "Revenge", "Unknown"],
  weapon: ["Gun", "Knife", "None"],
  location: ["Residential", "Commercial", "Public"]
};

export function TagSearch({ onReset }: TagSearchProps) {
  const [searchInput, setSearchInput] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [predictions, setPredictions] = useState<Array<{category: string, tag: string}>>([]);
  const [showPredictions, setShowPredictions] = useState(false);

  useEffect(() => {
    if (searchInput.length > 0) {
      const searchResults: Array<{category: string, tag: string}> = [];
      
      // Check for height pattern (e.g., 5'6)
      const heightPattern = /^(\d)'(\d{1,2})$/;
      if (heightPattern.test(searchInput)) {
        searchResults.push({
          category: 'Height',
          tag: searchInput
        });
      }
      
      // Check for age (numeric value)
      const agePattern = /^\d+$/;
      if (agePattern.test(searchInput)) {
        const age = parseInt(searchInput);
        if (age > 0 && age < 100) { // Reasonable age range
          // Add age prediction at the top for direct number input
          searchResults.unshift({
            category: 'Age',
            tag: searchInput
          });
          
          // Also add any matching age ranges from availableTags
          availableTags.age.forEach(range => {
            const [min, max] = range.split('-').map(num => parseInt(num.replace('+', '')));
            if (age >= min && (isNaN(max) || age <= max)) {
              searchResults.push({
                category: 'Age',
                tag: range
              });
            }
          });
        }
      }

      // Regular tag search
      Object.entries(availableTags).forEach(([category, tags]) => {
        tags.forEach(tag => {
          if (tag.toLowerCase().includes(searchInput.toLowerCase())) {
            searchResults.push({
              category: category.charAt(0).toUpperCase() + category.slice(1),
              tag
            });
          }
        });
      });

      setPredictions(searchResults);
      setShowPredictions(searchResults.length > 0);
    } else {
      setPredictions([]);
      setShowPredictions(false);
    }
  }, [searchInput]);

  const handleAddTag = (formattedTag: string) => {
    if (!activeTags.includes(formattedTag)) {
      setActiveTags([...activeTags, formattedTag]);
      setSearchInput("");
      setShowPredictions(false);
    }
  };

  const handleRemoveTag = (tag: string) => {
    setActiveTags(activeTags.filter(t => t !== tag));
  };

  const handleSearch = () => {
    if (activeTags.length > 0) {
      setShowResults(true);
    }
  };

  const getSuspects = () => {
    let suspects: any[] = [];
    const scorer = new SuspectScorer();
    
    // Collect all suspects from the database
    Object.values(mockDatabase).forEach(profiles => {
      suspects = [...suspects, ...profiles];
    });

    // Convert active tags to search criteria
    const searchCriteria: SearchCriteria[] = activeTags.map(tag => {
      const [category, value] = tag.split(':');
      return {
        category,
        value
      };
    });

    // Calculate scores for all suspects and transform to result format
    const scoredSuspects = suspects.map(suspect => {
      const score = scorer.calculateScore(suspect, searchCriteria);
      
      if ('priorConvictions' in suspect) {
        const murderSuspect = suspect as MurderProfile;
        return {
          id: murderSuspect.id,
          name: murderSuspect.name,
          matchScore: score,
          scoreBreakdown: scorer.getScoreBreakdown(suspect, searchCriteria),
          details: {
            age: murderSuspect.age,
            description: `${murderSuspect.gender}, ${murderSuspect.physicalDescription.build} build`,
            priorOffenses: murderSuspect.priorConvictions
          }
        };
      } else if ('details' in suspect) {
        const otherSuspect = suspect as RobberyProfile | BurglaryProfile;
        return {
          id: otherSuspect.id,
          name: otherSuspect.name,
          matchScore: score,
          scoreBreakdown: scorer.getScoreBreakdown(suspect, searchCriteria),
          details: {
            age: otherSuspect.details.age,
            description: otherSuspect.details.description,
            priorOffenses: otherSuspect.details.priorOffenses
          }
        };
      }
      return null;
    }).filter(Boolean);

    // Sort by match score (highest first) and filter out low scores
    return scoredSuspects
      .filter(suspect => suspect.matchScore > 20) // Only show suspects with >20% match
      .sort((a, b) => b.matchScore - a.matchScore);
  };

  return (
    <div className="space-y-8 w-full max-w-4xl mx-auto fade-in">
      {!showResults ? (
        <>
          <div className="space-y-4">
            <div className="relative">
              <Input
                placeholder="Type to search or select from available tags below..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="flex-1"
              />
              {showPredictions && predictions.length > 0 && (
                <div className="absolute w-full mt-1 bg-background border rounded-md shadow-lg z-50">
                  {predictions.map(({category, tag}) => (
                    <div
                      key={`${category}:${tag}`}
                      className="px-4 py-2 hover:bg-accent cursor-pointer"
                      onClick={() => handleAddTag(`${category}:${tag}`)}
                    >
                      {category}:{tag}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex justify-end">
              <Button onClick={handleSearch} disabled={activeTags.length === 0}>
                Search
              </Button>
            </div>

            {activeTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {activeTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    {tag} ×
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.entries(availableTags).map(([category, tags]) => (
              <Card key={category} className="p-4">
                <h3 className="font-semibold mb-2 capitalize">{category}</h3>
                <div className="space-y-1">
                  {tags.map((tag) => (
                    <div
                      key={tag}
                      onClick={() => handleAddTag(`${category.charAt(0).toUpperCase() + category.slice(1)}:${tag}`)}
                      className={`text-sm p-1 rounded cursor-pointer transition-colors
                        ${activeTags.includes(`${category.charAt(0).toUpperCase() + category.slice(1)}:${tag}`) 
                          ? 'bg-primary/20 text-primary' 
                          : 'hover:bg-secondary'
                        }`}
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <>
          <SuspectResults suspects={getSuspects()} />
          <div className="mt-8 text-center">
            <Button onClick={onReset} variant="outline" size="lg">
              Start Over
            </Button>
          </div>
        </>
      )}
    </div>
  );
}