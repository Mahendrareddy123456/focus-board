# FocusBoard — Task Management Dashboard

FocusBoard is a responsive, pixel-perfect task management dashboard built with **React**, **Vite**, and **Tailwind CSS**, designed in strict accordance with the official **FocusBoard Figma Design Reference** (Desktop 1440×1000, Mobile 390×1128, Task Form 760×822, and Focus Notes slides 15:2, 15:30, 15:58).

The application provides an intuitive single-user dashboard experience demonstrating core frontend principles, robust state management, working interactions, calculated statistics, and browser data persistence.

---

## 🚀 Live Demo & Repository
- **Hosting URL (GitHub Pages / Vercel):** *[Insert your live URL]*
- **GitHub Repository:** *[Insert your repository URL]*

---

## 🌟 Key Features

### 1. Dynamic Calculated Statistics (No Hardcoded Values)
- **Total Tasks:** Derived dynamically from total task state length across all categories.
- **In Progress:** Real-time count of active tasks currently under execution.
- **Completed:** Count of all successfully finished tasks.
- **Completion Rate (%):** Dynamically calculated using the formula:
  $$\text{Completion Rate} = \left(\frac{\text{Completed Tasks}}{\text{Total Tasks}}\right) \times 100$$
  Includes edge-case handling for zero tasks to prevent division by zero.
- **Instant Updates:** All cards react and update immediately upon task creation, status toggle, editing, or deletion.

### 2. Focus Notes Interactive Carousel (Figma Frames 15:2, 15:30, 15:58)
- Exact content, tags, headlines, and visual treatment matching Figma's 3 slides:
  - **Slide 1 (`15:2`):** *"Make today count."* — Floating task preview: *Design landing page* (65% progress).
  - **Slide 2 (`15:30`):** *"Small steps, big progress."* — Floating task preview: *Fix mobile navigation* (40% progress).
  - **Slide 3 (`15:58`):** *"Celebrate the wins."* — Floating task preview: *Review onboarding copy* (100% progress).
- **Working Controls:** Previous (`<`) and Next (`>`) buttons with circular wrap-around navigation.
- **Active Slide Indicators:** Interactive pill/dots showing current slide position with direct slide selection.
- **Keyboard Navigation:** Native left/right arrow key navigation support.

### 3. Full CRUD Operations
- **Create Task (`760 × 822` Figma Frame):**
  - Validation for mandatory title with clean inline error notifications.
  - Fields for Title, Description, Status, Priority, Due Date, and Category.
  - Automatically generates unique IDs (`TASK-XXXX`).
- **Edit Task:**
  - Reusable form modal populated with selected task details.
  - Preserves original task ID and updates state immutably.
- **Delete Task:**
  - Accessible confirmation modal preventing accidental deletions.
- **Status Updates:**
  - Direct circular checkbox status toggling (To do ➔ In progress ➔ Completed).
  - Inline status dropdown selector on each task card.

### 4. Cohesive Search, Multi-Filter & Status Tabs
- **Simultaneous Filtering:** Search query, status tabs, priority filter, and category pills all work together on the same task dataset.
- **Case-Insensitive Search:** Instant filtering across both task titles and descriptions.
- **Status Tabs with Badges:** Live count badges showing `All tasks`, `In progress`, `Completed`, and `To do`.
- **Reset Filters:** One-click reset button appearing whenever active filters are applied.

### 5. Browser Persistence (`localStorage`)
- Uses `localStorage` key `focusboard_tasks_v1`.
- **Safe Hydration:** Loads saved tasks on initial mount.
- **Sample Data Integrity:** Initial 7 sample tasks only populate when no saved tasks exist in `localStorage`, guaranteeing user modifications are never overwritten on browser refresh.
- Includes a handy *"Reset Sample"* button in the top bar to easily restore the original Figma sample data during demonstration or evaluation.

### 6. Responsive Design (390px, 768px, 1440px)
- **Desktop (1440px):** Full desktop layout matching Figma desktop frame (1:2) with fixed sidebar, hero header, 3-card overview grid, and task management table.
- **Tablet (768px):** Reflows columns into flexible grids, adapts carousel card proportions, and wraps filters smoothly without horizontal scrolling.
- **Mobile (390px):** Mobile-optimized layout with collapsible navigation drawer, top branding bar, stacked stat cards, floating action button (`+`), and fixed bottom navigation bar (`Overview`, `Tasks`, `Calendar`, `Settings`).

### 7. Accessibility & UX Quality
- Semantic HTML tags (`<header>`, `<main>`, `<aside>`, `<nav>`, `<section>`, `<button>`).
- Full keyboard operability (Escape closes modals, autofocus on form inputs, arrow keys for carousel).
- WCAG AA compliant color contrast ratios and visible focus indicator rings.
- ARIA roles, labels, and status announcements for screen readers.

---

## 🧠 State Management Architecture

The application adopts a **single source of truth** pattern encapsulated within a custom React hook: `useTasks.js`.

### Why this approach was chosen:
1. **Predictability & Immutability:** All state mutations (`addTask`, `updateTask`, `deleteTask`, `updateTaskStatus`) use pure functional updates (`setTasks(prev => ...)`) without in-place mutation of React state.
2. **Derived Computations:** Statistics (`stats`) and filtered lists (`filteredTasks`) are computed using `useMemo`. They automatically stay in sync with the core task array without redundant state variables.
3. **Encapsulation & Reusability:** Business logic for persistence, filtering, and validation is cleanly separated from presentation components, making components lean, testable, and maintainable.
4. **No Unnecessary Dependencies:** Satisfies the technical scope requirement (no heavy Redux boilerplate or backend needed for a 24-hour frontend assessment).

---

## 📁 Project Folder Structure

```
focusboard/
├── index.html                  # HTML entry point with Plus Jakarta Sans typography
├── package.json                # Dependencies and project scripts
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS theme configuration & brand tokens
├── postcss.config.js           # PostCSS configuration
├── src/
│   ├── main.jsx                # React DOM render entry
│   ├── App.jsx                 # Main application dashboard layout & modal coordinator
│   ├── index.css               # Tailwind directives & custom scrollbar styles
│   ├── data/
│   │   └── initialTasks.js     # 7 sample task records consistent with Figma design
│   ├── hooks/
│   │   └── useTasks.js         # Centralized task state, localStorage sync & filters
│   └── components/
│       ├── Sidebar.jsx         # Desktop sidebar navigation with active indicator
│       ├── Header.jsx          # Top breadcrumb bar, profile avatar & sample reset
│       ├── FocusNotes.jsx      # Figma 3-slide interactive carousel with controls
│       ├── StatCard.jsx        # Reusable metric card with icons and dynamic values
│       ├── FilterTabs.jsx      # Status tabs, search input, and priority/category filters
│       ├── TaskCard.jsx        # Individual task row with status toggle, badges & actions
│       ├── TaskList.jsx        # Rendered list of tasks with empty state illustration
│       ├── TaskForm.jsx        # Modal form for Creating and Editing tasks with validation
│       ├── DeleteModal.jsx     # Destructive action confirmation dialog
│       └── MobileNav.jsx       # Fixed bottom navigation bar for mobile viewports
├── README.md                   # Comprehensive project documentation
└── AI_USAGE.md                 # AI disclosure report according to rubric
```

---

## 🛠️ Installation & Local Setup

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build locally
npm run preview
```
