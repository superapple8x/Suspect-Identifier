# Criminal Investigation Management System

## Project Overview
This is a sophisticated web application designed to assist law enforcement agencies in managing and analyzing criminal cases. The system provides tools for suspect identification, case management, and pattern analysis across different types of crimes.

## Tech Stack

### Frontend Framework
- React 18.3.1 with TypeScript
- Vite 5.4.6 as the build tool
- React Router DOM 6.26.2 for routing

### UI Components and Styling
- Tailwind CSS for styling
- shadcn/ui for pre-built components
- Lucide React for icons
- Custom glass-morphism effects for modern UI

### State Management and Data Fetching
- TanStack Query (React Query) v5.56.2 for data management
- React Hook Form for form handling
- Zod for schema validation

## Core Features

### 1. Crime Type Classification
- **Misdemeanors**
  - Petty Theft
  - Vandalism
  - Public Intoxication
  - Simple Assault
  - DUI - First Offense

- **Felonies**
  - Burglary
  - Robbery
  - Aggravated Assault
  - Grand Theft Auto
  - Murder

### 2. Search Methods
#### Quick Search
- Question-based interface for guided searching
- Dynamic question flow based on crime type
- Contextual follow-up questions

#### Tag-based Search
- Multi-criteria search using tags
- Categories include:
  - Crime type
  - Age range
  - Gender
  - Physical characteristics
  - Motive
  - Weapon used
  - Location type

### 3. Suspect Matching System
- Pattern-based suspect identification
- Match percentage calculation
- Comprehensive suspect profiles including:
  - Personal details
  - Physical description
  - Prior offenses
  - Match score

## Development Progress

### Initial Phase
1. Project setup with Vite and TypeScript
2. Integration of Tailwind CSS and shadcn/ui
3. Basic routing implementation

### Core Features Implementation
1. Crime type selection interface
   - Categorization into misdemeanors and felonies
   - Subcategory selection

2. Question interface development
   - Dynamic question flow
   - Conditional question rendering
   - Answer tracking system

3. Tag-based search system
   - Tag categories definition
   - Multi-tag selection
   - Search prediction system

### Recent Updates and Improvements
1. Bug fixes:
   - Corrected TypeScript errors in TagSearch component
   - Fixed navigation issues in question flow
   - Improved radio button selection handling

2. Enhanced matching system:
   - Lowered minimum match threshold to 20%
   - Improved suspect filtering logic
   - Better handling of partial matches

3. UI/UX improvements:
   - Added responsive design
   - Implemented glass-morphism effects
   - Enhanced visual feedback for selections

## Project Structure
```
src/
├── components/
│   ├── CrimeTypeSelect.tsx
│   ├── QuestionInterface.tsx
│   ├── TagSearch.tsx
│   ├── SuspectResults.tsx
│   └── MurderQuestions.tsx
├── data/
│   ├── mockDatabase.ts
│   ├── murderProfiles.ts
│   ├── robberyProfiles.ts
│   └── burglaryProfiles.ts
├── pages/
│   └── Index.tsx
└── App.tsx
```

## Future Enhancements
1. Component refactoring for better maintainability
2. Advanced filtering options
3. Case management system
4. Statistical analysis tools
5. Integration with external databases

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```

## Contributing
This project is under active development. When contributing, please:
- Follow the existing code style
- Write clean, maintainable code
- Test thoroughly before submitting changes
- Document any new features or changes

## License
This project is proprietary and confidential.