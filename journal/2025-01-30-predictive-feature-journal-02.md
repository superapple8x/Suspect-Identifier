#### 2025-01-30 12:06 UTC+7 - Planned UI Restructure and Data Model Enhancement

- **Action**: Planning replacement of Quick Search with enhanced Predictive Analysis
- **Details**:

  1. UI Changes:
     - Remove Quick Search option
     - Keep only two main options:
       * Search by Tags
       * Predictive Analysis
     - Add crime type selection within Predictive Analysis

  2. Data Model Enhancements:
     - Expand PettyTheftProfile to include:
       * More detailed temporal patterns
       * Sophisticated behavioral markers
       * Enhanced psychological profiling
       * Detailed prior offense records
       * Advanced modus operandi tracking
       * Associate network information
       * Location preference weights
       * Environmental condition correlations

  3. Profile Structure Updates:
     ```typescript
     interface PettyTheftProfile {
       // Basic Info
       id: string;
       name: string;
       matchScore: number;

       // Predictive Parameters
       predictiveParameters: {
         temporalPatterns: {
           timeOfDay: string[];
           dayOfWeek: string[];
           seasonalVariation: number[]; // seasonal probabilities
         };
         environmentalFactors: {
           locationTypeWeights: Record<string, number>;
           weatherConditions: string[];
           crowdDensity: number;
         };
         behavioralMarkers: {
           escalationPattern: number;
           modusOperandiConsistency: number;
           recidivismProbability: number;
         };
       };

       // Enhanced Details
       details: {
         // Physical & Demographics
         age: number;
         gender: string;
         physicalDescription: {
           height: string;
           weight: string;
           build: string;
           distinguishingFeatures?: string[];
         };

         // Criminal History
         priorOffenses: {
           type: string;
           date: string;
           location: string;
           method: string;
         }[];

         // Behavioral Patterns
         modusOperandi: {
           targetPreference: string[];
           concealmentMethods: string[];
           distractionTechniques: string[];
           escapePatterns: string[];
           commonTools: string[];
         };

         // Additional Analysis
         associates?: string[];
         knownLocations: string[];
         psychologicalProfile?: {
           riskTaking: number;
           impulsivity: number;
           organizationLevel: number;
         };
       };
     }
     ```

  4. Integration Plan:
     - Phase out Quick Search components
     - Enhance PredictiveScorer to use new data model
     - Update question interface for comprehensive data gathering
     - Add crime type selection before prediction questions
     - Implement new visualization components for enhanced results

- **Next Steps**:
  1. Create new crime type selection interface
  2. Update existing profiles with enhanced data structure
  3. Modify PredictiveScorer to utilize new data points
  4. Update UI components to reflect new structure
  5. Add visualization improvements for prediction results
  6. Implement profile relationship mapping
  7. Add historical pattern analysis

- **Technical Considerations**:
  - Ensure backward compatibility during transition
  - Maintain type safety with TypeScript
  - Consider data migration strategy
  - Plan for scalability with more crime types
  - Consider caching strategy for prediction results