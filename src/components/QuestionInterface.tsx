import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MurderQuestions } from "./MurderQuestions";

interface Question {
  id: string;
  text: string;
  options: string[];
  dependsOn?: {
    questionId: string;
    value: string;
  };
}

const questions: Record<string, Question[]> = {
  "Burglary": [
    {
      id: "time",
      text: "What time of day did the burglary occur?",
      options: ["Daytime", "Nighttime", "Any"]
    },
    {
      id: "day",
      text: "What day(s) of the week?",
      options: ["Weekdays", "Weekends", "Any"]
    },
    {
      id: "location",
      text: "What type of location was targeted?",
      options: ["Residence", "Commercial", "Other"]
    },
    {
      id: "entry",
      text: "How did the burglar gain entry?",
      options: ["Forced Entry", "Lockpicking", "Open Window/Door", "Other"]
    },
    {
      id: "target",
      text: "What was stolen?",
      options: ["Cash", "Jewelry", "Electronics", "Other"]
    }
  ],
  "Robbery": [
    {
      id: "time",
      text: "What time of day did the robbery occur?",
      options: ["Daytime", "Nighttime", "Any"]
    },
    {
      id: "location",
      text: "Where did the robbery occur?",
      options: ["Street", "Store", "Residence", "Bank"]
    },
    {
      id: "weapon",
      text: "Was a weapon used?",
      options: ["Yes", "No"]
    },
    {
      id: "weaponType",
      text: "What type of weapon was used?",
      options: ["Firearm", "Knife", "Other"],
      dependsOn: {
        questionId: "weapon",
        value: "Yes"
      }
    },
    {
      id: "target",
      text: "What was taken?",
      options: ["Cash", "Personal Belongings", "Merchandise", "Other"]
    }
  ],
  "Aggravated Assault": [
    {
      id: "relationship",
      text: "What was the relationship between victim and perpetrator?",
      options: ["Stranger", "Acquaintance", "Domestic", "Unknown"]
    },
    {
      id: "weapon",
      text: "What type of weapon was used?",
      options: ["Firearm", "Blunt Object", "Sharp Object", "Other"]
    }
  ],
  "Grand Theft Auto": [
    {
      id: "vehicleType",
      text: "What type of vehicle was stolen?",
      options: ["Luxury Car", "SUV", "Truck", "Motorcycle"]
    },
    {
      id: "method",
      text: "How was the vehicle stolen?",
      options: ["Key Theft", "Hotwired", "Carjacking", "Unknown"]
    }
  ],
  "Murder": [
    {
      id: "method",
      text: "What was the cause of death?",
      options: ["Firearm", "Sharp Weapon", "Blunt Force", "Other"]
    },
    {
      id: "scene",
      text: "Where was the crime scene?",
      options: ["Residence", "Public Place", "Remote Location", "Vehicle"]
    }
  ]
};

interface QuestionInterfaceProps {
  crimeType: string;
  onComplete: (answers: Record<string, string>) => void;
}

export function QuestionInterface({ crimeType, onComplete }: QuestionInterfaceProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  if (crimeType === "Murder") {
    return (
      <div className="max-w-2xl mx-auto mt-8">
        <MurderQuestions 
          onAnswerSubmit={onComplete}
        />
      </div>
    );
  }

  const currentQuestions = questions[crimeType] || [];

  const shouldShowQuestion = (question: Question): boolean => {
    if (!question.dependsOn) return true;
    return answers[question.dependsOn.questionId] === question.dependsOn.value;
  };

  const visibleQuestions = currentQuestions.filter(shouldShowQuestion);
  const currentQuestion = visibleQuestions[currentQuestionIndex];

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < visibleQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      onComplete(answers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  if (!currentQuestion || !shouldShowQuestion(currentQuestion)) return null;

  return (
    <Card className="p-6 max-w-md mx-auto mt-8 glass-card fade-in">
      <div className="space-y-6">
        <div>
          <Badge variant="outline" className="mb-4">
            Question {currentQuestionIndex + 1} of {visibleQuestions.length}
          </Badge>
          <h3 className="text-lg font-medium">{currentQuestion.text}</h3>
        </div>

        <RadioGroup onValueChange={handleAnswer} value={answers[currentQuestion.id]}>
          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option}>{option}</Label>
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
      </div>
    </Card>
  );
}