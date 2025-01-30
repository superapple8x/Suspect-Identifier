import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PettyTheftQuestionsProps {
  onComplete: (answers: {
    timeOfDay: string;
    location: string;
    crowdLevel: string;
    weather: string;
  }) => void;
  onProgressUpdate?: (progress: number) => void;
}

const PettyTheftQuestions: React.FC<PettyTheftQuestionsProps> = ({ onComplete, onProgressUpdate }) => {
  const [answers, setAnswers] = React.useState({
    timeOfDay: '',
    location: '',
    crowdLevel: '',
    weather: '',
  });

  React.useEffect(() => {
    const filledAnswers = Object.values(answers).filter(Boolean).length;
    const totalQuestions = Object.keys(answers).length;
    const progress = Math.round((filledAnswers / totalQuestions) * 100);
    onProgressUpdate?.(progress);
  }, [answers, onProgressUpdate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(answers).every(value => value)) {
      onComplete(answers);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card className="p-6">
        <div className="space-y-6">
          <div className="space-y-4">
            <Label>What time of day is it?</Label>
            <RadioGroup
              value={answers.timeOfDay}
              onValueChange={(value) => setAnswers(prev => ({ ...prev, timeOfDay: value }))}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="morning" id="morning" />
                <Label htmlFor="morning">Morning (5AM-12PM)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="afternoon" id="afternoon" />
                <Label htmlFor="afternoon">Afternoon (12PM-5PM)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="evening" id="evening" />
                <Label htmlFor="evening">Evening (5PM-9PM)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="night" id="night" />
                <Label htmlFor="night">Night (9PM-5AM)</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <Label>What type of location?</Label>
            <Select 
              value={answers.location}
              onValueChange={(value) => setAnswers(prev => ({ ...prev, location: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select location type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="shopping_mall">Shopping Mall</SelectItem>
                <SelectItem value="retail_store">Retail Store</SelectItem>
                <SelectItem value="public_transport">Public Transport</SelectItem>
                <SelectItem value="parking_lot">Parking Lot</SelectItem>
                <SelectItem value="residential_area">Residential Area</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label>How crowded is the area?</Label>
            <RadioGroup
              value={answers.crowdLevel}
              onValueChange={(value) => setAnswers(prev => ({ ...prev, crowdLevel: value }))}
              className="grid grid-cols-3 gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="low" id="low" />
                <Label htmlFor="low">Low</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="moderate" id="moderate" />
                <Label htmlFor="moderate">Moderate</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="high" />
                <Label htmlFor="high">High</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <Label>What's the weather condition?</Label>
            <Select 
              value={answers.weather}
              onValueChange={(value) => setAnswers(prev => ({ ...prev, weather: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select weather condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="clear">Clear</SelectItem>
                <SelectItem value="cloudy">Cloudy</SelectItem>
                <SelectItem value="rainy">Rainy</SelectItem>
                <SelectItem value="snowy">Snowy</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button type="submit" className="w-full mt-6" disabled={!Object.values(answers).every(value => value)}>
          Analyze Predictions
        </Button>
      </Card>
    </form>
  );
};

export default PettyTheftQuestions;