# TOWA Case Study — Vue 3 Card Grid Application

A responsive card grid application built with Vue 3, Vite, TypeScript, and Tailwind CSS.
Developed as part of the TOWA Digital internship assessment.

---

## Tech Stack

- **Vue 3** (Composition API)
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Vitest** + **@vue/test-utils** (unit, component & integration testing)

---

## Project Setup

### Prerequisites

- Node.js (matches `myapp/package.json` engines)
- npm

### Install dependencies

```bash
cd myapp
npm install
```

### Run development server

```bash
npm run dev
```

App runs at: [http://localhost:5173](http://localhost:5173)

### Run tests

```bash
npm run test:unit
```

### Build for production

```bash
npm run build
```

---

## Features

- Responsive card grid — 1 col (mobile) / 2 col (tablet) / 3 col (desktop)
- Live data from PokéAPI (24 Pokémon loaded on mount)
- Search filter — name search triggers after 3 characters (case insensitive)
- Enhancement: numeric queries (e.g. "1", "#007") search by Pokémon ID immediately
- Type filter chips (derived from loaded Pokémon types)
- Pagination (9 cards per page)
- Light/dark theme toggle (persisted in localStorage)
- Loading and error states handled gracefully
- Clean layout with sticky header and structured footer

---

## Project Structure

```text
src/
├── components/
│   ├── layout/
│   │   ├── AppHeader.vue      # Sticky navigation header
│   │   └── AppFooter.vue      # 3-column footer
│   └── grid/
│       ├── CardGrid.vue            # Grid composition + pagination + type filter
│       ├── CardItem.vue            # Individual clickable card
│       ├── GridHero.vue            # Hero/title section
│       ├── GridSearchFilters.vue   # Search input + type chips
│       ├── GridLoading.vue         # Loading skeletons
│       └── GridPagination.vue      # Pagination controls
├── composables/
│   └── usePokemon.ts          # Data fetching + search filtering logic
├── types/
│   └── pokemon.ts             # TypeScript interfaces
└── __tests__/
    ├── usePokemon.test.ts      # Unit tests
    ├── CardItem.test.ts        # Component tests
    ├── CardGrid.test.ts        # Integration tests
    └── App.spec.ts             # App mount test
```

---

## Testing Strategy

The testing approach follows Test-Oriented Development principles.

### Test Levels

- Component Testing: validation of business logic (usePokemon composable)
- Integration Testing: interaction between search input and grid rendering
- System Testing: overall user flow (data loading, search, display)

### Risk-Based Prioritization

Testing focused on high-risk areas:

- Search functionality (core feature)
- Data filtering correctness
- API data transformation

Lower-risk areas:

- Layout styling
- Static content

### Test End Criteria

- All high-priority tests pass
- No critical defects remain
- Core user flow is stable

👉 Due to practical constraints, not all possible test cases were implemented; focus was placed on critical functionality and high-risk areas.

### Test Results

| Level | File | Tests | Status |
| --- | --- | --- | --- |
| Unit | usePokemon.test.ts | 13 | ✅ Passing |
| Component | CardItem.test.ts | 2 | ✅ Passing |
| Integration | CardGrid.test.ts | 1 | ✅ Passing |
| App | App.spec.ts | 1 | ✅ Passing |
| **Total** | All | **17** | **✅ All passing** |

### Test Design Techniques

- **Boundary Value Analysis** — search triggers at exactly 3 characters (tested at 0, 1, 2, 3, 4+)
- **Equivalence Partitioning** — valid input / short input / no match / case variations
- **Scenario Testing** — real user search interaction
- **Data Safety** — empty pokemon list, empty types array

### Not Tested

- External PokeAPI reliability (assumed stable, mocked in tests)
- Performance testing (out of scope for this assessment)

---

## Test Management & Metrics

Testing was conducted iteratively following a cyclic process:
Plan → Design → Execute → Evaluate

Metrics used to evaluate quality:

- Test case execution: 17/17 passing
- Coverage of critical functionality (search + filtering logic)
- Failure tracking: no critical defects remaining

Test prioritization:

- High: search functionality and filtering correctness
- Medium: UI rendering and interaction
- Low: layout aesthetics

Focus was placed on high-risk areas to ensure maximum quality with minimal test set.

## Defect Management

Defects identified during development were classified as:

- Critical: breaking core functionality (blocking search or API)
- Major: incorrect filtering behavior
- Minor: UI inconsistencies

Resolution approach:

- Critical defects resolved immediately
- Major defects fixed before final test cycle
- Minor issues reviewed based on time constraints

All identified defects were re-tested after fixes (re-testing), and regression testing ensured no new issues were introduced.

## Configuration Management

- Git used for version control with meaningful, atomic commits
- Test cases version-controlled alongside source code
- Each feature developed and committed independently

---

## AI-Assisted Development

This project follows an AI-first development approach.

AI tools were used for:

- structuring architecture and component hierarchy
- generating initial test cases
- identifying edge cases and improving test coverage

Human judgment was applied to:

- validate correctness of generated code
- refine test strategy and prioritization
- ensure maintainability and clean architecture

AI accelerated development, but final decisions were always verified manually.
