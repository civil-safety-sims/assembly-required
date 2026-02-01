# Assembly Required - Development Guide

**Source Code:** https://github.com/civil-safety-sims/assembly-required

**Live Demo:** https://assembly-required-woo-v1.web.app

---

## Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| **Framework** | React | 19.2.0 |
| **Language** | TypeScript | 5.9.3 |
| **Build Tool** | Vite | 7.2.4 |
| **Styling** | Tailwind CSS | 4.1.18 |
| **Drag & Drop** | dnd-kit | 6.3.1 |
| **Icons** | Lucide React | 0.563.0 |
| **Hosting** | Firebase Hosting | - |

---

## Dependencies

### Runtime
- **react** / **react-dom** - UI framework
- **@dnd-kit/core** / **@dnd-kit/utilities** - Modern, accessible drag-and-drop
- **lucide-react** - Icon library
- **clsx** + **tailwind-merge** - Conditional class utilities

### Development
- **vite** - Build tool and dev server
- **typescript** - Type checking
- **tailwindcss** + **postcss** + **autoprefixer** - Styling
- **eslint** + **typescript-eslint** - Linting

---

## Project Structure

```
cyberpunk-dossier/
├── src/
│   ├── components/     # UI components
│   │   ├── Activist.tsx        # Paper doll with equipment slots
│   │   ├── Briefing.tsx        # Environmental controls + simulate button
│   │   ├── SupplyCache.tsx     # Draggable item inventory
│   │   ├── DraggableItem.tsx   # Individual item component
│   │   ├── DroppableSlot.tsx   # Equipment slot component
│   │   ├── ReportCard.tsx      # Simulation results modal
│   │   ├── SettingsModal.tsx   # User preferences
│   │   ├── SignDisplay.tsx     # Protest sign visualization
│   │   └── SignInputModal.tsx  # Sign text editor
│   ├── data/
│   │   ├── gameData.ts         # Safety items with attributes
│   │   └── sources.ts          # Trusted source registry
│   ├── logic/
│   │   └── simulationEngine.ts # Scoring algorithm
│   ├── types.ts                # TypeScript interfaces
│   ├── App.tsx                 # Main application
│   └── main.tsx                # Entry point
├── dist/                       # Production build output
├── firebase.json               # Firebase hosting config
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
```

---

## Development Commands

```bash
cd cyberpunk-dossier

# Install dependencies
npm install

# Start local dev server (hot reload)
npm run dev

# Type check and build for production
npm run build

# Preview production build locally
npm run preview

# Run linter
npm run lint
```

---

## Deployment

The app is hosted on Firebase Hosting.

```bash
# Build first
npm run build

# Deploy to Firebase
firebase deploy --only hosting
```

---

## Architecture Notes

### Data Flow
1. **gameData.ts** defines items with safety attributes
2. **App.tsx** manages drag-and-drop state between SupplyCache and Activist slots
3. **simulationEngine.ts** evaluates equipped items against environmental conditions
4. **ReportCard.tsx** displays scored feedback with source citations

### Attribute System
Items have boolean attributes (e.g., `isFlammable`, `isAbsorbent`) that trigger rules in the simulation engine based on threat level and weather conditions.

### Source Verification
Every item links to a trusted source URL. Feedback cards display the source name and link so users can verify advice.
