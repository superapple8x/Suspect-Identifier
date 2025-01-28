import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface MurderQuestionsProps {
  onAnswerSubmit: (answers: Record<string, string>) => void;
  onReset?: () => void;
}

export function MurderQuestions({ onAnswerSubmit, onReset }: MurderQuestionsProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const questions = [
    {
      id: "timeOfDay",
      text: "What time of day did the murder occur?",
      options: ["Morning", "Afternoon", "Evening", "Night", "Unknown"]
    },
    {
      id: "location",
      text: "Where did the murder take place?",
      options: [
        "Victim's Residence",
        "Perpetrator's Residence",
        "Street/Alley",
        "Vehicle",
        "Place of Business",
        "Secluded Area",
        "Other",
        "Unknown"
      ]
    },
    {
      id: "weaponUsed",
      text: "Was a weapon used?",
      options: ["Yes", "No", "Unknown"]
    },
    {
      id: "weaponType",
      text: "What type of weapon was used?",
      options: ["Handgun", "Rifle", "Shotgun", "Knife/Sharp Object", "Blunt Object", "Other"],
      dependsOn: { id: "weaponUsed", value: "Yes" }
    },
    {
      id: "relationship",
      text: "Was there a known relationship with the victim?",
      options: ["Yes", "No", "Unknown"]
    },
    {
      id: "relationshipType",
      text: "What was the nature of the relationship?",
      options: [
        "Family Member",
        "Spouse/Partner",
        "Friend",
        "Acquaintance",
        "Business Associate",
        "Known Enemy",
        "Other"
      ],
      dependsOn: { id: "relationship", value: "Yes" }
    },
    {
      id: "motive",
      text: "What was the apparent motive?",
      options: [
        "Financial Gain",
        "Revenge",
        "Jealousy",
        "Argument/Dispute",
        "To Silence a Witness",
        "Other",
        "Unknown"
      ]
    }
  ];

  const handleAnswerChange = (value: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    
    setAnswers(prev => {
      const newAnswers = { ...prev, [currentQuestion.id]: value };
      
      // Only remove dependent answers if the condition is not met
      if (currentQuestion.id === "weaponUsed" && value !== "Yes") {
        delete newAnswers.weaponType;
      }
      if (currentQuestion.id === "relationship" && value !== "Yes") {
        delete newAnswers.relationshipType;
      }
      
      return newAnswers;
    });
  };

  const handleNext = () => {
    const visibleQuestions = questions.filter(q => {
      if (!q.dependsOn) return true;
      return answers[q.dependsOn.id] === q.dependsOn.value;
    });
    
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < visibleQuestions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      setIsComplete(true);
      onAnswerSubmit(answers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const shouldShowQuestion = (question: typeof questions[0]): boolean => {
    if (!question.dependsOn) return true;
    return answers[question.dependsOn.id] === question.dependsOn.value;
  };

  const visibleQuestions = questions.filter(shouldShowQuestion);
  const currentQuestion = visibleQuestions[currentQuestionIndex];

  if (!currentQuestion || isComplete) return null;

  return (
    <Card className="p-6 space-y-6">
      <div>
        <Badge variant="outline" className="mb-4">
          Question {currentQuestionIndex + 1} of {visibleQuestions.length}
        </Badge>
        <h3 className="font-medium">{currentQuestion.text}</h3>
      </div>

      <RadioGroup
        onValueChange={handleAnswerChange}
        value={answers[currentQuestion.id] || ""}
      >
        <div className="space-y-2">
          {currentQuestion.options.map(option => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`${currentQuestion.id}-${option}`} />
              <Label htmlFor={`${currentQuestion.id}-${option}`}>{option}</Label>
            </div>
          ))}
        </div>
      </RadioGroup>

      <div className="flex justify-between gap-4">
        <Button 
          onClick={handlePrevious}
          variant="outline"
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>
        <Button 
          onClick={handleNext}
          disabled={!answers[currentQuestion.id]}
          className="flex-1"
        >
          {currentQuestionIndex < visibleQuestions.length - 1 ? "Next Question" : "Complete"}
        </Button>
      </div>
    </Card>
  );
}