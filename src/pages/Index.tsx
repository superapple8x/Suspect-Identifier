import { useState, useRef } from "react";
import { CrimeTypeSelect } from "@/components/CrimeTypeSelect";
import { QuestionInterface } from "@/components/QuestionInterface";
import { SuspectResults } from "@/components/SuspectResults";
import PettyTheftPrediction from "@/components/PettyTheftPrediction";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { mockDatabase } from "@/data/mockDatabase";
import type { CrimeProfile } from "@/data/mockDatabase";
import type { MurderProfile } from "@/data/murderProfiles";
import type { RobberyProfile } from "@/data/robberyProfiles";
import { Search, FileQuestion, BarChart } from "lucide-react";
import { TagSearch } from "@/components/TagSearch";

type SearchMode = "quick" | "tags" | "predict" | null;

const Index = () => {
  const [searchMode, setSearchMode] = useState<SearchMode>(null);
  const [crimeType, setCrimeType] = useState("");
  const [showQuestions, setShowQuestions] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleCrimeSelect = (value: string) => {
    setCrimeType(value);
    setShowQuestions(true);
    setShowResults(false);
    setAnswers({});
  };

  const handleQuestionsComplete = (answers: Record<string, string>) => {
    setAnswers(answers);
    setShowResults(true);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleReset = () => {
    setSearchMode(null);
    setCrimeType("");
    setShowQuestions(false);
    setShowResults(false);
    setAnswers({});
  };

  const getSuspects = () => {
    const suspects = mockDatabase[crimeType] || [];
    
    return suspects.map(suspect => {
      // Base score starts at 20 to ensure even low matches are shown
      let baseScore = 20;

      const transformSuspect = (profile: CrimeProfile) => {
        if ('priorConvictions' in profile) {
          const murderProfile = profile as MurderProfile;
          return {
            id: murderProfile.id,
            name: murderProfile.name,
            matchScore: baseScore,
            details: {
              age: murderProfile.age,
              description: `${murderProfile.gender}, ${murderProfile.physicalDescription.build} build`,
              priorOffenses: murderProfile.priorConvictions
            }
          };
        } else if ('details' in profile) {
          const robberyProfile = profile as RobberyProfile;
          return {
            id: robberyProfile.id,
            name: robberyProfile.name,
            matchScore: Math.max(20, robberyProfile.matchScore), // Ensure minimum 20% match
            details: {
              age: robberyProfile.details.age,
              description: robberyProfile.details.description,
              priorOffenses: robberyProfile.details.priorOffenses
            }
          };
        }

        return {
          id: suspect.id,
          name: suspect.name,
          matchScore: baseScore,
          details: {
            age: 0,
            description: "No details available",
            priorOffenses: []
          }
        };
      };

      return transformSuspect(suspect);
    }).sort((a, b) => b.matchScore - a.matchScore);
  };

  if (!searchMode) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <Badge variant="outline" className="mb-4">Suspect Identification System</Badge>
            <h1 className="text-4xl font-bold tracking-tight">
              Choose Search Method
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select how you want to search for potential suspects
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card 
              className="p-6 cursor-pointer transition-all hover:border-primary"
              onClick={() => setSearchMode("quick")}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <FileQuestion className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Quick Search</h3>
              </div>
              <p className="text-muted-foreground">
                Answer a series of questions to identify potential suspects based on patterns
              </p>
            </Card>

            <Card 
              className="p-6 cursor-pointer transition-all hover:border-primary"
              onClick={() => setSearchMode("tags")}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <Search className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Search by Tags</h3>
              </div>
              <p className="text-muted-foreground">
                Use specific tags to find suspects matching exact criteria
              </p>
            </Card>

            <Card 
              className="p-6 cursor-pointer transition-all hover:border-primary"
              onClick={() => setSearchMode("predict")}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <BarChart className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Predictive Analysis</h3>
              </div>
              <p className="text-muted-foreground">
                Use advanced algorithms to predict potential criminal activity patterns
              </p>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <Badge variant="outline" className="mb-4">Suspect Identification System</Badge>
          <h1 className="text-4xl font-bold tracking-tight">
            {searchMode === "predict" ? "Predictive Analysis" : "Identify Potential Suspects"}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {searchMode === "quick" 
              ? "Answer a series of questions about the incident to help identify potential suspects based on patterns and historical data."
              : searchMode === "tags"
              ? "Search for suspects using specific tags and criteria."
              : "Analyze patterns and predict potential criminal activities using advanced algorithms."
            }
          </p>
        </div>

        <div className="space-y-8">
          {searchMode === "predict" ? (
            <>
              <PettyTheftPrediction />
              <div className="mt-8 text-center">
                <Button onClick={handleReset} variant="outline" size="lg">
                  Back to Search Methods
                </Button>
              </div>
            </>
          ) : searchMode === "quick" ? (
            <>
              {!showQuestions && (
                <CrimeTypeSelect onSelect={handleCrimeSelect} />
              )}
              
              {showQuestions && !showResults && (
                <QuestionInterface 
                  crimeType={crimeType}
                  onComplete={handleQuestionsComplete}
                />
              )}
              
              <div ref={resultsRef}>
                {showResults && (
                  <>
                    <SuspectResults suspects={getSuspects()} />
                    <div className="mt-8 text-center">
                      <Button onClick={handleReset} variant="outline" size="lg">
                        Start Over
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <TagSearch onReset={handleReset} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;