# Treatment Plan Builder

Mock up for creating and managing treatment plans with configuration management, validation, and real-time preview.

| **Framework** | React 19.2 + Vite 7.3 |
| **Styling** | Tailwind CSS v4 + Flowbite |
| **Icons** | lucide-react 0.575+ |
| **State Management** | Custom `usePlanState` hook |
| **Build Tool** | Vite (ESM, HMR enabled) |

```
src/
├── App.jsx                          # Layout orchestration
├── components/
│   └── UIComponents.jsx             # Reusable design system (Card, Field, Toggle, etc)
├── constants/
│   └── catalogues.js                # Data catalogs (medications, add-ons, billing, etc)
├── hooks/
│   └── usePlanState.js              # State management
├── sections/                        # Feature sections (form areas)
│   ├── PlanBasicsSection.jsx        
│   ├── MedicationsSection.jsx       
│   ├── AddOnsSection.jsx            
│   ├── DispatchSection.jsx          
│   ├── PrescriptionRulesSection.jsx 
│   ├── BillingSection.jsx           
│   ├── ReviewSection.jsx            
│   └── SummaryPanel.jsx             
├── utils/
│   └── helpers.js                   # Utilities (classNames, date formatting, etc)
├── index.css                        # Global styles & Tailwind directives
└── main.jsx                         # React DOM entry point
```

## Getting Started

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm or yarn

### Installation

```bash
# Clone repository
git clone <repo-url>
cd treatment-plan

# Install dependencies
npm install

# Start development server
npm run dev

```

### Build for Production

```bash
npm run build

# Preview production build
npm run preview
```
### Available Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Create optimized production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint (if configured) |

## Notes

- **Status**: Proof of concept
- **Validation**: Real-time form validation with user feedback
- **Export**: Full plan configuration available as JSON for API integration
- **Responsive**: Optimized for mobile, tablet, and desktop screens
