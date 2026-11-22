# AI Usage Disclosure

This document discloses the use of AI tools in the development of the **FocusBoard** application, in accordance with the MobileFirst Trainee Assessment guidelines and evaluation rubric.

---

## 🛠️ Tools Used
- **Google Gemini (Antigravity Assistant):** Used for architectural design breakdown, Figma frame analysis, component structuring, and implementation guidance.

---

## 💬 Representative Prompts
The following 4 prompts represent key interactions during project planning and development:

1. *"Analyze the MobileFirst assignment specification and the Figma reference frames (1:2 desktop, 1:167 mobile, 1:279 create-task form, and 15:2, 15:30, 15:58 carousel slides). List all mandatory functional criteria, component hierarchy, and design tokens."*
2. *"Design a centralized React custom hook (`useTasks`) that provides full CRUD operations, handles case-insensitive title search, status filtering, and priority filtering simultaneously, derives real-time dashboard statistics without hardcoding, and persists cleanly to localStorage without overwriting user data on refresh."*
3. *"Write a lightweight, accessible React carousel component matching the visual treatment, floating card preview, progress bar, and pagination dots of the 3 Focus Notes slides in Figma, supporting keyboard navigation and touch responsiveness."*
4. *"Review the task creation form against Figma frame 760×822. Include required field validation for title and due date, inline error messaging, and an accessible confirmation modal for destructive task deletion."*

---

## 🧩 AI-Assisted Areas
- **Component Architecture:** Establishing a modular folder hierarchy (`src/components/`, `src/hooks/`, `src/data/`) separating presentation from state logic.
- **Tailwind CSS Styling & Figma Fidelity:** Translating Figma visual hierarchy, typography (Plus Jakarta Sans), gradients, padding, border radii, and color palettes into Tailwind utility classes.
- **Responsive Layout Testing:** Designing fluid reflow patterns across desktop (1440px), tablet (768px), and mobile (390px with bottom navigation).
- **Accessibility & ARIA Compliance:** Incorporating semantic HTML landmarks, modal dialog focus management, keyboard accessibility (arrow keys, escape), and visible focus rings.

---

## 🔍 Verified or Corrected Suggestion

### Carousel Implementation Architecture
- **Initial AI Suggestion:** The initial proposal suggested installing an external third-party slider library such as `swiper` or `slick-carousel` to implement the 3-slide Focus Notes carousel.
- **Verification & Decision to Reject:** 
  - An external carousel library would introduce unnecessary bundle overhead (~40KB+), extra CSS dependencies, and complex customization hurdles when matching Figma's exact floating preview card layout and circular indicator styling.
  - Furthermore, the assignment scope explicitly prioritizes demonstrated React fundamentals and state management within a 24-hour evaluation timeline.
- **Correction Implemented:** 
  - Instead of using a third-party library, a lightweight, native React component (`FocusNotes.jsx`) was implemented using React `useState`, pure CSS transitions, and an `useEffect` event listener for left/right keyboard arrow keys.
  - This reduced bundle size, avoided third-party styling conflicts, and achieved 100% fidelity to the three Figma slides (`15:2`, `15:30`, `15:58`).
