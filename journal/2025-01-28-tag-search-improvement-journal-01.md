# Tag Search Improvement Journal

## 2025-01-28 10:43 UTC+7 - Implemented Algorithmic Scoring System

- **Action**: Implemented a weighted scoring system for suspect matching
- **Details**:
  - Created new `SuspectScorer` class in `src/lib/SuspectScorer.ts` with the following features:
    - Weighted scoring categories:
      - Physical characteristics (40 points)
      - Behavioral patterns (35 points)
      - Historical indicators (25 points)
    - Score breakdown functionality for transparency
    - Partial matching support for similar attributes
    - Confidence level indicators

  - Enhanced UI components:
    - Updated `SuspectResults.tsx` to show detailed score breakdowns
    - Added progress bars with color-coded confidence levels
    - Implemented sorting by match score with 20% minimum threshold

  - Technical Implementation:
    - Score normalization to percentage scale
    - Modular scoring functions for each criterion
    - Type-safe interfaces for score breakdowns
    - Reusable confidence level calculations

  - Key Features:
    - Physical Traits Scoring:
      - Height: Exact and partial matches within ranges
      - Build: Similar build types get partial scores
      - Hair/Eye Color: Exact matches
    - Demographics:
      - Age: Range-based matching with partial scores
      - Gender: Exact matching
    - Modus Operandi:
      - Location types with similarity matching
      - Weapon categorization and partial matching
      - Motive analysis with related category matching

  - Improvements Over Previous System:
    - More nuanced matching vs binary yes/no
    - Better handling of similar but non-exact matches
    - Transparent scoring helps investigators understand matches
    - Configurable weights for different criteria

  - Future Considerations:
    - Machine learning for weight optimization
    - Additional scoring criteria based on behavioral patterns
    - Integration with external databases for enhanced matching
    - Statistical analysis of matching accuracy

## Technical Implementation Details

### SuspectScorer Class
```typescript
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

class SuspectScorer {
  // Weighted scoring implementation
  // Score normalization
  // Partial matching logic
}
```

### UI Enhancements
```typescript
function getConfidenceColor(score: number): string {
  if (score >= 80) return "bg-green-500";
  if (score >= 60) return "bg-blue-500";
  if (score >= 40) return "bg-yellow-500";
  return "bg-red-500";
}
```

### Integration Points
- TagSearch component for criteria collection
- SuspectResults component for score visualization
- Mock database for suspect profiles

### Testing Notes
- Verified scoring accuracy with sample profiles
- Confirmed partial matching behavior
- Validated UI updates and score displays
- Tested edge cases in criteria combinations