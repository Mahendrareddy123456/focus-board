export const INITIAL_TASKS = [
  {
    id: "TASK-101",
    title: "Design landing page",
    description: "Revamp homepage layout with modern typography, clear value proposition, and mobile-friendly component hierarchy.",
    category: "Design",
    status: "In progress",
    priority: "High",
    dueDate: "2026-11-22",
    createdAt: "2026-11-18T10:00:00.000Z"
  },
  {
    id: "TASK-102",
    title: "Fix mobile navigation",
    description: "Resolve responsive drawer touch target overlaps and ensure smooth slide transitions on 390px viewports.",
    category: "Development",
    status: "In progress",
    priority: "Medium",
    dueDate: "2026-11-25",
    createdAt: "2026-11-19T11:30:00.000Z"
  },
  {
    id: "TASK-103",
    title: "Review onboarding copy",
    description: "Audit tone, terminology, and clarity across initial product walkthrough steps with the product team.",
    category: "Design",
    status: "Completed",
    priority: "Low",
    dueDate: "2026-11-20",
    createdAt: "2026-11-15T09:00:00.000Z"
  },
  {
    id: "TASK-104",
    title: "Implement dark mode theme",
    description: "Configure CSS color tokens and Tailwind dark class toggling with local storage theme preference preservation.",
    category: "Development",
    status: "To do",
    priority: "Medium",
    dueDate: "2026-11-28",
    createdAt: "2026-11-20T14:15:00.000Z"
  },
  {
    id: "TASK-105",
    title: "Conduct usability testing",
    description: "Run 45-minute user walkthrough sessions with 5 trainees to evaluate filter discoverability and form ergonomics.",
    category: "Testing",
    status: "In progress",
    priority: "High",
    dueDate: "2026-11-24",
    createdAt: "2026-11-21T08:45:00.000Z"
  },
  {
    id: "TASK-106",
    title: "Optimize bundle performance",
    description: "Split heavy vendor chunks, optimize SVG icons, and ensure Lighthouse performance score reaches 95+.",
    category: "Development",
    status: "To do",
    priority: "Low",
    dueDate: "2026-11-30",
    createdAt: "2026-11-21T16:20:00.000Z"
  },
  {
    id: "TASK-107",
    title: "Audit color contrast & accessibility",
    description: "Verify WCAG 2.1 AA compliance across all status badge colors, interactive focus rings, and screen-reader labels.",
    category: "Research",
    status: "Completed",
    priority: "High",
    dueDate: "2026-11-19",
    createdAt: "2026-11-14T13:00:00.000Z"
  }
];

export const CATEGORIES = [
  "All",
  "Design",
  "Development",
  "Testing",
  "Research",
  "Marketing"
];

export const STATUS_OPTIONS = [
  "To do",
  "In progress",
  "Completed"
];

export const PRIORITY_OPTIONS = [
  "Low",
  "Medium",
  "High"
];
