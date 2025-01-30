import React, { useCallback, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { PredictiveScorer } from '@/lib/PredictiveScorer';
import { pettyTheftProfiles, PettyTheftProfile } from '@/data/pettyTheftProfiles';
import PettyTheftQuestions from './PettyTheftQuestions';
import { CrimeTypeSelector, CrimeType } from './CrimeTypeSelector';

interface PredictionResult {
  score: number;
  confidence: number;
  breakdown: Record<string, number>;
}

interface QuestionAnswers {
  timeOfDay: string;
  location: string;
  crowdLevel: string;
  weather: string;
}

type CrowdLevel = 'low' | 'moderate' | 'high';

const crowdLevelValues: Record<CrowdLevel, number> = {
  low: 0.2,
  moderate: 0.6,
  high: 0.9
};

const PettyTheftPrediction: React.FC = () => {
  const [showResults, setShowResults] = useState(false);
  const [selectedCrimeType, setSelectedCrimeType] = useState<CrimeType>('petty-theft');
  const [results, setResults] = useState<PredictionResult[]>([]);
  const [questionProgress, setQuestionProgress] = useState(0);

  const handleQuestionsComplete = useCallback((answers: QuestionAnswers) => {
    const scorer = new PredictiveScorer();
    const time = new Date();
    
    const newPredictions = pettyTheftProfiles.map(profile => 
      scorer.calculatePredictiveScore(
        profile,
        time,
        answers.weather,
        crowdLevelValues[answers.crowdLevel as CrowdLevel]
      )
    );

    setResults(newPredictions);
    setShowResults(true);
  }, []);

  const formatScore = useCallback((score: number): string => {
    return (score * 100).toFixed(1) + '%';
  }, []);

  const getScoreColor = useCallback((score: number): string => {
    if (score >= 0.7) return 'text-red-500';
    if (score >= 0.4) return 'text-yellow-500';
    return 'text-green-500';
  }, []);

  const getConfidenceLabel = useCallback((confidence: number): string => {
    if (confidence >= 0.8) return 'High Confidence';
    if (confidence >= 0.5) return 'Medium Confidence';
    return 'Low Confidence';
  }, []);

  const renderFeatureComingSoon = () => (
    <div className="p-6">
      <Alert variant="default" className="bg-white/10 backdrop-blur-lg border-white/20">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Feature Coming Soon</AlertTitle>
        <AlertDescription>
          Predictive analysis for {selectedCrimeType.replace(/-/g, ' ')} is currently under development. 
          This feature will include specialized parameters and scoring algorithms tailored to this crime type.
          For now, you can try the petty theft prediction system.
        </AlertDescription>
      </Alert>
    </div>
  );

  const renderQuestionSection = () => (
    <div className="space-y-6 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
      <div className="space-y-4">
        <CrimeTypeSelector
          selectedCrimeType={selectedCrimeType}
          onCrimeTypeChange={(type) => {
            setSelectedCrimeType(type);
            setShowResults(false);
            setQuestionProgress(0);
          }}
        />
        
        {selectedCrimeType === 'petty-theft' && (
          <>
            {questionProgress > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Question Progress</span>
                  <span>{questionProgress}%</span>
                </div>
                <Progress value={questionProgress} className="h-2" />
              </div>
            )}

            <PettyTheftQuestions
              onComplete={handleQuestionsComplete}
              onProgressUpdate={setQuestionProgress}
            />
          </>
        )}
      </div>
    </div>
  );

  const renderResultCard = (result: PredictionResult, profile: PettyTheftProfile, index: number) => (
    <Card key={index} className="p-6 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">
            {profile.name}
          </h3>
          <span className={`text-2xl font-bold ${getScoreColor(result.score)}`}>
            {formatScore(result.score)}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Prediction Confidence</span>
            <span>{getConfidenceLabel(result.confidence)}</span>
          </div>
          <Progress value={Math.round(result.confidence * 100)} className="h-2" />
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="breakdown">
            <AccordionTrigger>Score Breakdown</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                {Object.entries(result.breakdown).map(([factor, score]) => (
                  <div key={factor} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="capitalize">{factor.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span>{formatScore(score)}</span>
                    </div>
                    <Progress value={Math.round(score * 100)} className="h-1" />
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="details">
            <AccordionTrigger>Profile Details</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Basic Information</h4>
                    <ul className="space-y-1 text-sm">
                      <li>Age: {profile.details.age}</li>
                      <li>Gender: {profile.details.gender}</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Physical Description</h4>
                    <ul className="space-y-1 text-sm">
                      <li>Height: {profile.details.physicalDescription.height}</li>
                      <li>Weight: {profile.details.physicalDescription.weight}</li>
                      <li>Build: {profile.details.physicalDescription.build}</li>
                      {profile.details.physicalDescription.distinguishingFeatures && (
                        <li>
                          Distinguishing Features: {profile.details.physicalDescription.distinguishingFeatures.join(", ")}
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Criminal History</h4>
                  <ul className="space-y-1 text-sm">
                    <li>Prior Offenses: {profile.details.priorOffenses.length} recorded</li>
                    <li>Known Locations: {profile.details.knownLocations.join(", ")}</li>
                  </ul>
                </div>

                {profile.details.psychologicalProfile && (
                  <div>
                    <h4 className="font-medium mb-2">Psychological Profile</h4>
                    <ul className="space-y-1 text-sm">
                      <li>Risk Taking: {(profile.details.psychologicalProfile.riskTaking * 100).toFixed(0)}%</li>
                      <li>Impulsivity: {(profile.details.psychologicalProfile.impulsivity * 100).toFixed(0)}%</li>
                      <li>Organization Level: {(profile.details.psychologicalProfile.organizationLevel * 100).toFixed(0)}%</li>
                    </ul>
                  </div>
                )}

                {profile.details.associates && profile.details.associates.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Known Associates</h4>
                    <p className="text-sm">
                      {profile.details.associates.map(associateId => {
                        const associate = pettyTheftProfiles.find(p => p.id === associateId);
                        return associate ? associate.name : 'Unknown';
                      }).join(', ')}
                    </p>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6 p-6">
      {selectedCrimeType === 'petty-theft' ? (
        !showResults ? (
          renderQuestionSection()
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">Petty Theft Prediction Analysis</h2>
            {results.map((result, index) => renderResultCard(result, pettyTheftProfiles[index], index))}
          </>
        )
      ) : (
        <>
          {renderQuestionSection()}
          {renderFeatureComingSoon()}
        </>
      )}
    </div>
  );
};

export default PettyTheftPrediction;