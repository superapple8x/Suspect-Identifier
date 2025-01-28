import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";

interface ScoreBreakdown {
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

interface Suspect {
  id: string;
  name: string;
  matchScore: number;
  scoreBreakdown?: ScoreBreakdown;
  details: {
    age: number;
    description: string;
    priorOffenses: string[];
  };
}

interface SuspectResultsProps {
  suspects: Suspect[];
}

function getConfidenceColor(score: number): string {
  if (score >= 80) return "bg-green-500";
  if (score >= 60) return "bg-blue-500";
  if (score >= 40) return "bg-yellow-500";
  return "bg-red-500";
}

function getConfidenceLabel(score: number): string {
  if (score >= 80) return "High Confidence";
  if (score >= 60) return "Medium Confidence";
  if (score >= 40) return "Low Confidence";
  return "Very Low Confidence";
}

export function SuspectResults({ suspects }: SuspectResultsProps) {
  return (
    <div className="max-w-3xl mx-auto mt-8 space-y-6 fade-in">
      <div className="text-center mb-8">
        <Badge variant="outline" className="mb-2">Results</Badge>
        <h2 className="text-2xl font-semibold">Potential Matches</h2>
        <p className="text-sm text-muted-foreground mt-2">
          Showing {suspects.length} suspects ranked by match score
        </p>
      </div>

      <ScrollArea className="h-[600px] rounded-lg p-4">
        <div className="space-y-6">
          {suspects.map((suspect) => (
            <Card key={suspect.id} className="p-6 glass-card">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium">{suspect.name}</h3>
                  <p className="text-sm text-muted-foreground">Age: {suspect.details.age}</p>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="mb-2">
                    {Math.round(suspect.matchScore)}% Match
                  </Badge>
                  <div className="text-xs text-muted-foreground">
                    {getConfidenceLabel(suspect.matchScore)}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <Progress 
                  value={suspect.matchScore} 
                  className={`h-2 ${getConfidenceColor(suspect.matchScore)}`}
                />
              </div>

              <p className="text-sm mb-4">{suspect.details.description}</p>

              {suspect.scoreBreakdown && (
                <div className="mb-4 p-4 bg-muted rounded-lg">
                  <h4 className="text-sm font-medium mb-3">Match Breakdown:</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-xs font-medium mb-2">Physical Traits</h5>
                      <div className="space-y-1">
                        {Object.entries(suspect.scoreBreakdown.physical).map(([trait, score]) => (
                          score > 0 && (
                            <div key={trait} className="flex justify-between text-xs">
                              <span className="capitalize">{trait.replace(/([A-Z])/g, ' $1').trim()}</span>
                              <span>{Math.round(score * 100)}%</span>
                            </div>
                          )
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="text-xs font-medium mb-2">Demographics & MO</h5>
                      <div className="space-y-1">
                        {Object.entries({
                          ...suspect.scoreBreakdown.demographics,
                          ...suspect.scoreBreakdown.modusOperandi
                        }).map(([trait, score]) => (
                          score > 0 && (
                            <div key={trait} className="flex justify-between text-xs">
                              <span className="capitalize">{trait.replace(/([A-Z])/g, ' $1').trim()}</span>
                              <span>{Math.round(score * 100)}%</span>
                            </div>
                          )
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Prior Offenses:</h4>
                <div className="flex flex-wrap gap-2">
                  {suspect.details.priorOffenses.map((offense) => (
                    <Badge key={offense} variant="outline">
                      {offense}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}