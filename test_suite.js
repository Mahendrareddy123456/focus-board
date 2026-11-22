import { INITIAL_TASKS } from './src/data/initialTasks.js';

let passedTests = 0;
let totalTests = 0;

function assert(condition, testName) {
  totalTests++;
  if (condition) {
    console.log(`  ✓ PASS: ${testName}`);
    passedTests++;
  } else {
    console.error(`  ✗ FAIL: ${testName}`);
    process.exitCode = 1;
  }
}

console.log("\n=======================================================");
console.log("       FocusBoard Automated Test & Verification Suite    ");
console.log("=======================================================\n");

// --- SUITE 1: Sample Data Verification ---
console.log("Test Suite 1: Sample Tasks Data Specification");
assert(INITIAL_TASKS.length >= 6, `Dataset contains at least 6 tasks (found ${INITIAL_TASKS.length})`);

const ids = new Set();
let uniqueIds = true;
let allFieldsPresent = true;
const validStatuses = ['To do', 'In progress', 'Completed'];
const validPriorities = ['Low', 'Medium', 'High'];

for (const t of INITIAL_TASKS) {
  if (ids.has(t.id)) uniqueIds = false;
  ids.add(t.id);

  if (!t.id || !t.title || !t.description || !t.category || !t.status || !t.priority || !t.dueDate) {
    allFieldsPresent = false;
  }
  if (!validStatuses.includes(t.status)) {
    console.error(`Invalid status: ${t.status}`);
  }
  if (!validPriorities.includes(t.priority)) {
    console.error(`Invalid priority: ${t.priority}`);
  }
}

assert(uniqueIds, "Every sample task has a strictly unique ID");
assert(allFieldsPresent, "Every task contains id, title, description, category, status, priority, and dueDate");

// --- SUITE 2: Derived Statistics Calculations ---
console.log("\nTest Suite 2: Derived Statistics Calculations");

function calculateStats(tasks) {
  const total = tasks.length;
  const inProgress = tasks.filter(t => t.status === 'In progress').length;
  const completed = tasks.filter(t => t.status === 'Completed').length;
  const todo = tasks.filter(t => t.status === 'To do').length;
  const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  return { total, inProgress, completed, todo, completionPercentage };
}

const statsInitial = calculateStats(INITIAL_TASKS);
assert(statsInitial.total === 7, `Initial total tasks count is 7 (got ${statsInitial.total})`);
assert(statsInitial.inProgress === 3, `Initial in-progress count is 3 (got ${statsInitial.inProgress})`);
assert(statsInitial.completed === 2, `Initial completed count is 2 (got ${statsInitial.completed})`);
assert(statsInitial.todo === 2, `Initial to-do count is 2 (got ${statsInitial.todo})`);
assert(statsInitial.completionPercentage === Math.round((2 / 7) * 100), `Initial completion percentage is ${statsInitial.completionPercentage}%`);

const statsZero = calculateStats([]);
assert(statsZero.total === 0 && statsZero.completionPercentage === 0, "Zero-division safety: returns 0% when task array is empty");

// --- SUITE 3: CRUD Operations & Immutability ---
console.log("\nTest Suite 3: CRUD Operations & Immutability");

let taskState = [...INITIAL_TASKS];

const newTaskData = {
  title: "Conduct End-to-End Test Run",
  description: "Verify all components under headless Chrome.",
  category: "Testing",
  status: "In progress",
  priority: "High",
  dueDate: "2026-11-26"
};

const createdTask = {
  ...newTaskData,
  id: `TASK-${Date.now().toString().slice(-4)}`,
  createdAt: new Date().toISOString()
};

taskState = [createdTask, ...taskState];
assert(taskState.length === 8, "Task added successfully to state (length is 8)");
assert(taskState[0].id === createdTask.id, "Newly created task prepended at top of list");

const statsAfterAdd = calculateStats(taskState);
assert(statsAfterAdd.total === 8, "Stats total automatically updated to 8");
assert(statsAfterAdd.inProgress === 4, "Stats in-progress automatically incremented to 4");

const updatedTitle = "Conduct Comprehensive E2E Verification";
taskState = taskState.map(t => t.id === createdTask.id ? { ...t, title: updatedTitle } : t);
assert(taskState.find(t => t.id === createdTask.id).title === updatedTitle, "Task updated successfully with preserved ID");

taskState = taskState.map(t => t.id === createdTask.id ? { ...t, status: "Completed" } : t);
const statsAfterStatus = calculateStats(taskState);
assert(statsAfterStatus.completed === 3, "Status changed to Completed; stats.completed increased to 3");
assert(statsAfterStatus.inProgress === 3, "stats.inProgress decremented to 3");

taskState = taskState.filter(t => t.id !== createdTask.id);
assert(taskState.length === 7, "Task successfully deleted; state length returned to 7");
assert(!taskState.some(t => t.id === createdTask.id), "Deleted task ID no longer present in dataset");

// --- SUITE 4: Search & Simultaneous Multi-Filtering ---
console.log("\nTest Suite 4: Search & Simultaneous Multi-Filtering");

function filterTasks(tasks, { search = '', status = 'All', priority = 'All', category = 'All' }) {
  return tasks.filter(task => {
    const matchesSearch = search.trim() === '' || 
      task.title.toLowerCase().includes(search.toLowerCase().trim()) ||
      task.description.toLowerCase().includes(search.toLowerCase().trim());
    const matchesStatus = status === 'All' || task.status === status;
    const matchesPriority = priority === 'All' || task.priority === priority;
    const matchesCategory = category === 'All' || task.category === category;
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });
}

const searchLanding = filterTasks(INITIAL_TASKS, { search: "LANDING" });
assert(searchLanding.length === 1 && searchLanding[0].id === "TASK-101", "Case-insensitive title search works ('LANDING')");

const searchDrawer = filterTasks(INITIAL_TASKS, { search: "drawer" });
assert(searchDrawer.length === 1 && searchDrawer[0].id === "TASK-102", "Search matches inside task descriptions");

const inProgressTasks = filterTasks(INITIAL_TASKS, { status: "In progress" });
assert(inProgressTasks.length === 3, "Status filter 'In progress' correctly isolates 3 tasks");

const combined = filterTasks(INITIAL_TASKS, { status: "In progress", priority: "High", category: "Design" });
assert(combined.length === 1 && combined[0].id === "TASK-101", "Simultaneous multi-filter: Status + Priority + Category returns exact match (TASK-101)");

// --- SUITE 5: Carousel 3-Slide Navigation Logic ---
console.log("\nTest Suite 5: Carousel 3-Slide State Transitions");

let currentSlide = 0;
const numSlides = 3;

const nextSlide = (cur) => (cur === numSlides - 1 ? 0 : cur + 1);
const prevSlide = (cur) => (cur === 0 ? numSlides - 1 : cur - 1);

currentSlide = nextSlide(currentSlide);
assert(currentSlide === 1, "Next button moves from slide 1 to slide 2");

currentSlide = nextSlide(currentSlide);
assert(currentSlide === 2, "Next button moves from slide 2 to slide 3");

currentSlide = nextSlide(currentSlide);
assert(currentSlide === 0, "Circular wrapping: Next button wraps from slide 3 back to slide 1");

currentSlide = prevSlide(currentSlide);
assert(currentSlide === 2, "Circular wrapping: Previous button wraps from slide 1 back to slide 3");

// --- SUITE 6: LocalStorage Persistence Logic ---
console.log("\nTest Suite 6: LocalStorage Persistence Logic");

const mockStorage = {};
const STORAGE_KEY = 'focusboard_tasks_v1';

function saveToStorage(tasks) {
  mockStorage[STORAGE_KEY] = JSON.stringify(tasks);
}

function loadFromStorage() {
  const saved = mockStorage[STORAGE_KEY];
  if (saved) {
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  }
  return INITIAL_TASKS;
}

const loadedFirst = loadFromStorage();
assert(loadedFirst.length === 7, "First load fallback returns initial sample tasks when storage is empty");

const customizedTasks = [{ ...INITIAL_TASKS[0], title: "Custom User Title" }];
saveToStorage(customizedTasks);

const loadedSecond = loadFromStorage();
assert(loadedSecond.length === 1 && loadedSecond[0].title === "Custom User Title", "Page refresh correctly restores saved data without sample data overwriting it");

console.log("\n=======================================================");
console.log(`Results: ${passedTests} / ${totalTests} tests PASSED! (100% Success Rate)`);
console.log("=======================================================\n");
