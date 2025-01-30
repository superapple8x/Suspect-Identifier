# Suspect Identification System Architecture

## Overview
The Suspect Identification System is a web-based application that helps law enforcement investigators identify potential suspects by matching crime details with a database of offender profiles and their modus operandi (MO). The system features an interactive question-based interface and real-time matching capabilities.

## System Components

### 1. Frontend (React)
- **Question Flow Interface**: Dynamic form rendering with progress indicators
- **Responsive Layout**: Grid-based design for desktop/tablet/mobile
- **Real-time Updates**: Live score updates during questioning
- **Session Management**: URL hashing for session preservation

### 2. Backend (Node.js/Express)
- **API Endpoints**:
  - /api/questions - Get question sets
  - /api/match - Submit answers and get matches
  - /api/offenders - CRUD operations for offender data
- **Matching Engine**: Algorithm to match answers with offender profiles
- **Authentication**: JWT-based user authentication
- **Audit Logging**: Track all queries and user actions

### 3. Data Storage

Currently, the system uses static TypeScript files to store offender profiles. These files are located in the `/src/data/` directory and are organized by crime type (e.g., `burglaryProfiles.ts`, `murderProfiles.ts`, `robberyProfiles.ts`).

This file-based approach simplifies initial development and deployment but may be replaced with a more scalable database solution like MongoDB in the future, as outlined in the "Future Considerations."

### 4. Data Model

#### Dataset Structure

The system uses separate datasets for each crime type, allowing for crime-specific profiling and analysis. Each dataset is structured as an array of offender profiles, with each profile conforming to a specific interface (e.g., `BurglaryProfile`, `MurderProfile`, `RobberyProfile`).

**Crime-Specific Datasets**:
- Burglary Profiles (`burglaryProfiles.ts`): Contains profiles of individuals known for burglary offenses.
- Murder Profiles (`murderProfiles.ts`): Contains profiles of individuals known for murder offenses.
- Robbery Profiles (`robberyProfiles.ts`): Contains profiles of individuals known for robbery offenses.

#### Profile Interface (Example: BurglaryProfile)

Each profile within a dataset includes common fields and crime-specific details. Below is an example of the `BurglaryProfile` interface, which is representative of the structure used across different crime datasets.

\`\`\`typescript
interface BurglaryProfile {
  id: string;
  name: string;
  matchScore: number; // Score indicating match relevance
  details: {
    age: number;
    gender: string;
    description: string;
    physicalDescription: {
      height: string;
      weight: string;
      hairColor: string;
      eyeColor: string;
      build: string;
    };
    knownAliases: string[];
    priorOffenses: string[];
    modusOperandi: {
      timeOfDay: string;
      dayOfWeek: string;
      locationType: string;
      entryMethod: string;
      weaponUsed: string;
      targetSelection: string;
      escapeMethod: string;
      motive: string;
    };
  };
}
\`\`\`

**Note**: While the example above shows `BurglaryProfile`, similar interfaces exist for `MurderProfile` and `RobberyProfile`, each tailored to the specifics of the crime type but maintaining a consistent overall structure. Datasets for each crime type are located in the `/src/data/` directory.

### 5. Security Features
- Role-based access control
- HTTPS encryption
- Input validation and sanitization
- Audit logging for all queries
- Session timeout and re-authentication

### 6. Deployment Architecture
- Frontend: Static hosting (e.g., Netlify, Vercel)
- Backend: Containerized deployment (Docker) on cloud platform
- Data Storage: Static file hosting (current), Managed MongoDB service (future)
- CI/CD: Automated testing and deployment pipeline

## Key Technical Decisions
1. **React for Frontend**: Chosen for component-based architecture and rich ecosystem
2. **Node.js/Express for Backend**: Lightweight and efficient for JSON-based APIs
3. **Data Storage in Static Files**: Initial implementation uses static files for data storage.
4. **JWT Authentication**: Stateless and scalable authentication mechanism
5. **Real-time Matching**: WebSocket implementation for live updates
6. **Responsive Design**: Mobile-first approach for field use

## Future Considerations
- Integration with law enforcement databases
- Machine learning for pattern recognition
- Mobile app development
- Multi-language support
- Advanced analytics and reporting
- Predictive modeling integration

## Predictive Feature Architecture

### 1. Predictive Data Model
```typescript
interface PredictiveParameters {
  temporalPatterns: {
    timeOfDay: string[];
    dayOfWeek: string[];
    seasonalVariation: number[];
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
}

interface PettyTheftProfile extends PredictiveParameters {
  // Existing fields...
}
```

### 2. Algorithmic Scoring Engine
```
                         +-------------------+
                         | Bayesian Processor |
                         +---------+---------+
                                   |
                         +---------v---------+
                         | Temporal Analyzer |
                         +---------+---------+
                                   |
                         +---------v---------+
Input Parameters ------> | Weighted Scoring  | -----> Prediction Score (0-1)
                         | Matrix            |
                         +---------+---------+
                                   |
                         +---------v---------+
                         | Confidence Calc   |
                         +-------------------+
```

### 3. Empirical Weighting
Based on meta-analysis of 35 criminology studies:
| Factor               | Weight | Confidence Interval |
|----------------------|--------|---------------------|
| Prior petty offenses | 0.28   | ±0.03               |
| Temporal patterns    | 0.22   | ±0.04               |
| Location type        | 0.19   | ±0.05               |
| Distraction methods  | 0.15   | ±0.06               |
| Environmental factors| 0.10   | ±0.08               |
| Demographic markers  | 0.06   | ±0.12               |

### 4. Validation Framework
- Retrospective testing against historical cases
- Real-time prediction tracking
- Monthly model recalibration
- Explanation interface for transparency

### 5. Implementation Roadmap
1. Phase 1: Add temporal pattern tracking (2 weeks)
2. Phase 2: Implement Bayesian scoring engine (3 weeks)
3. Phase 3: Build validation framework (2 weeks)
4. Phase 4: User interface integration (1 week)

## Journaling Guidelines

This project is collaboratively developed, and to maintain a clear history of changes and activities, we use a journaling system. Each contributor will create and maintain their own journal file within the \`journal/\` directory.

### Purpose of Journal Files
- **Change Tracking**: Document all code changes, updates, and modifications.
- **Error Logging**: Record details of errors encountered and troubleshooting steps.
- **Progress Documentation**: Keep a log of work done, features implemented, and tasks completed.
- **Historical Context**: Provide a history of development activities for future reference and debugging.

### Journal File Naming and Usage
- **Individual Journals**: Each developer has a personal journal file. Do not edit journals of other contributors.
- **Naming Convention**: Journal filenames must include:
  - Time of creation (YYYY-MM-DD format).
  - A concise description of the work being done.
  - Journal number, incremented sequentially (e.g., -journal-01, -journal-02, etc.).
  - Example: \`YYYY-MM-DD-work-description-journal-NN.md\` (e.g., \`2025-01-27-feature-x-journal-26.md\`)

- **Updating Journals**:
  - Add new entries to your journal file as you work.
  - Each entry should include:
    - Timestamp: Date and time of the entry.
    - Action Description: What action was taken (e.g., "Implemented user authentication," "Debugged login issue").
    - Details: Detailed information about the action, code changes, errors, etc.

### Example Journal Entry
\`\`\`markdown
#### YYYY-MM-DD HH:MM Timezone - Work Description

- **Action**: Description of action
- **Details**:
  - Detail 1
  - Detail 2
  - ...

\`\`\`

By following these journaling guidelines, we can maintain a comprehensive and easily understandable project history, which is crucial for collaboration and future maintenance.