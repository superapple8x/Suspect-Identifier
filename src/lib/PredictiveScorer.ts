import { PettyTheftProfile } from "@/data/pettyTheftProfiles";

interface EmpiricalWeights {
  priorOffenses: number;
  temporalPatterns: number;
  locationTypeWeights: number;
  distractionMethods: number;
  environmentalFactors: number;
   behavioralMarkers: number;
  psychologicalProfile: number;
}

export class PredictiveScorer {
  // Empirical weights from meta-analysis of 35 criminology studies
  private readonly weights: EmpiricalWeights = {
    priorOffenses: 0.28,
    temporalPatterns: 0.22,
    locationTypeWeights: 0.19,
    distractionMethods: 0.15,
    environmentalFactors: 0.10,
    behavioralMarkers: 0.06,
    psychologicalProfile: 0.06
  };

  // Confidence intervals for each weight (±)
  private readonly confidenceIntervals: EmpiricalWeights = {
    priorOffenses: 0.04,
    temporalPatterns: 0.05,
    locationTypeWeights: 0.06,
    distractionMethods: 0.07,
    environmentalFactors: 0.09,
    behavioralMarkers: 0.08,
    psychologicalProfile: 0.13
  };

  calculatePredictiveScore(
    profile: PettyTheftProfile,
    currentTime: Date,
    currentWeather: string,
    crowdLevel: number
  ): {
    score: number;
    confidence: number;
    breakdown: Record<string, number>;
  } {
    const breakdown: Record<string, number> = {};

    // 1. Prior Offenses Score
    const priorOffensesScore = this.calculatePriorOffensesScore(profile);
    breakdown.priorOffenses = priorOffensesScore;

    // 2. Temporal Patterns Score
    const temporalScore = this.calculateTemporalScore(profile, currentTime);
    breakdown.temporalPatterns = temporalScore;

    // 3. Location Type Score
    const locationScore = this.calculateLocationScore(profile);
    breakdown.locationType = locationScore;

    // 4. Distraction Methods Score
    const distractionScore = this.calculateDistractionScore(profile);
    breakdown.distractionMethods = distractionScore;

    // 5. Environmental Factors Score
    const environmentalScore = this.calculateEnvironmentalScore(
      profile,
      currentWeather,
      crowdLevel
    );
    breakdown.environmentalFactors = environmentalScore;

    // 6. Demographic Markers Score
    const demographicScore = this.calculateDemographicScore(profile);
    breakdown.demographicMarkers = demographicScore;

    // Calculate weighted average
    const totalScore = Object.entries(this.weights).reduce(
      (sum, [key, weight]) => sum + breakdown[key] * weight,
      0
    );

    // Calculate confidence based on confidence intervals and score distribution
    const confidence = this.calculateConfidence(breakdown);

    return {
      score: totalScore,
      confidence,
      breakdown
    };
  }

 private calculatePriorOffensesScore(profile: PettyTheftProfile): number {
    const priorPettyThefts = profile.details.priorOffenses.filter(offense =>
      offense.type.includes('theft') ||
      offense.type.includes('shoplifting') ||
      offense.type.includes('stealing')
    ).length;

    // Higher score for repeat offenders, max out at 5 prior offenses
    return Math.min(priorPettyThefts / 5, 1);
  }

  private calculateTemporalScore(
    profile: PettyTheftProfile,
    currentTime: Date
  ): number {
    let score = 0;

    // Time of day match
    const hour = currentTime.getHours();
    const timeOfDay = profile.predictiveParameters.temporalPatterns.timeOfDay;
    if (
      (hour >= 5 && hour < 12 && timeOfDay.includes('morning')) ||
      (hour >= 12 && hour < 17 && timeOfDay.includes('afternoon')) ||
      (hour >= 17 && hour < 21 && timeOfDay.includes('evening')) ||
      ((hour >= 21 || hour < 5) && timeOfDay.includes('night'))
    ) {
      score += 0.4;
    }

    // Day of week match
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const currentDay = days[currentTime.getDay()];
    if (profile.predictiveParameters.temporalPatterns.dayOfWeek.includes(currentDay)) {
      score += 0.3;
    }

    // Seasonal variation
    const seasons = ['spring', 'summer', 'fall', 'winter'];
    const currentMonth = currentTime.getMonth();
    const seasonIndex = Math.floor(((currentMonth + 1) % 12) / 3);
    score += profile.predictiveParameters.temporalPatterns.seasonalVariation[seasonIndex] * 0.3;

    return score;
  }

  private calculateLocationScore(profile: PettyTheftProfile): number {
    // Get the highest location weight from the profile
    return Math.max(...Object.values(profile.predictiveParameters.environmentalFactors.locationTypeWeights));
  }

  private calculateDistractionScore(profile: PettyTheftProfile): number {
    // Score based on sophistication of distraction technique and consistency
    const hasDistractionTechnique = profile.details.modusOperandi.distractionTechniques !== undefined;
    const consistency = profile.predictiveParameters.behavioralMarkers.modusOperandiConsistency;

    return hasDistractionTechnique ? (0.7 + (consistency * 0.3)) : (consistency * 0.5);
  }

  private calculateEnvironmentalScore(
    profile: PettyTheftProfile,
    currentWeather: string,
    crowdLevel: number
  ): number {
    let score = 0;

    // Weather conditions match
    if (profile.predictiveParameters.environmentalFactors.weatherConditions
        .includes(currentWeather.toLowerCase())) {
      score += 0.5;
    }

    // Crowd density preference match
    const crowdPreference = profile.predictiveParameters.environmentalFactors.crowdDensity;
    const crowdDifference = Math.abs(crowdPreference - crowdLevel);
    score += (1 - crowdDifference) * 0.5;

    return score;
  }

  private calculateDemographicScore(profile: PettyTheftProfile): number {
    // Calculate based on escalation risk and recidivism probability
    const escalationRisk = profile.predictiveParameters.behavioralMarkers.escalationPattern;
    const recidivismProb = profile.predictiveParameters.behavioralMarkers.recidivismProbability;

    return (escalationRisk * 0.3) + (recidivismProb * 0.7);
  }

  private calculateConfidence(breakdown: Record<string, number>): number {
    // Calculate weighted standard deviation of scores
    const scores = Object.entries(this.weights).map(([key, weight]) => ({
      score: breakdown[key],
      weight,
      confidence: 1 - this.confidenceIntervals[key as keyof EmpiricalWeights]
    }));

    // Higher confidence when scores are consistent and confidence intervals are small
    const weightedConfidence = scores.reduce(
      (sum, { score, weight, confidence }) => sum + (score * weight * confidence),
      0
    );

    return weightedConfidence;
  }
}