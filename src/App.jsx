import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { FocusNotes } from './components/FocusNotes';
import { StatCard } from './components/StatCard';
import { FilterTabs } from './components/FilterTabs';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';
import { DeleteModal } from './components/DeleteModal';
import { MobileNav } from './components/MobileNav';
import { useTasks } from './hooks/useTasks';
import { Plus, Check } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const {
    tasks,
    filteredTasks,
    stats,
    searchQuery,
    setSearchQuery,
    selectedStatus,
    setSelectedStatus,
    selectedPriority,
    setSelectedPriority,
    selectedCategory,
    setSelectedCategory,
    resetFilters,
    addTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    resetToSampleData
  } = useTasks();

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3200);
  };

  const handleOpenCreateForm = () => {
    setTaskToEdit(null);
    setIsTaskFormOpen(true);
  };

  const handleOpenEditForm = (task) => {
    setTaskToEdit(task);
    setIsTaskFormOpen(true);
  };

  const handleSaveTask = (taskData) => {
    if (taskToEdit) {
      updateTask(taskToEdit.id, taskData);
      triggerToast(`Task "${taskData.title}" updated successfully.`);
    } else {
      addTask(taskData);
      triggerToast(`Task "${taskData.title}" created successfully.`);
    }
  };

  const handleConfirmDelete = (id) => {
    const title = taskToDelete?.title;
    deleteTask(id);
    triggerToast(`Task "${title}" removed.`);
    setTaskToDelete(null);
  };

  const handleStatusChange = (id, newStatus) => {
    updateTaskStatus(id, newStatus);
    triggerToast(`Status updated to "${newStatus}".`);
  };

  const handleResetSample = () => {
    resetToSampleData();
    resetFilters();
    triggerToast('Reset to initial sample tasks.');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div 
          role="status" 
          aria-live="polite" 
          className="fixed bottom-20 lg:bottom-8 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs sm:text-sm animate-in slide-in-from-bottom-5 duration-200"
        >
          <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isMobileMenuOpen} 
        setIsOpen={setIsMobileMenuOpen} 
      />

      {/* Main Content */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0 pb-20 lg:pb-12">
        <Header 
          activeTab={activeTab} 
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onResetSampleData={handleResetSample}
        />

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl w-full mx-auto space-y-8">
          {/* Hero Welcome Header */}
          <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Your work, in focus.
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Plan your day, stay organized, and clear tasks that matter most.
              </p>
            </div>

            <button
              onClick={handleOpenCreateForm}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-98 shadow-md shadow-indigo-200 hover:shadow-indigo-300 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 shrink-0 self-start sm:self-center"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>New task</span>
            </button>
          </section>

          {/* Focus Notes 3-Slide Carousel */}
          <FocusNotes />

          {/* Overview Statistics Cards */}
          <section aria-labelledby="overview-heading" className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 id="overview-heading" className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Overview
              </h2>
              <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                {stats.completionPercentage}% Completion rate
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Total tasks"
                value={stats.total}
                subtext="Across all project categories"
                iconType="total"
                variant="purple"
              />
              <StatCard
                title="In progress"
                value={stats.inProgress}
                subtext="Currently active tasks"
                iconType="inProgress"
                variant="sky"
              />
              <StatCard
                title="Completed"
                value={stats.completed}
                subtext="Successfully finished tasks"
                iconType="completed"
                variant="emerald"
              />
              <StatCard
                title="To do"
                value={stats.todo}
                subtext="Ready to begin"
                iconType="rate"
                variant="amber"
              />
            </div>
          </section>

          {/* My Tasks Section */}
          <section aria-labelledby="my-tasks-heading" className="space-y-5 pt-2">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 id="my-tasks-heading" className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  My tasks
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Manage, track, and update every aspect of your project tasks.
                </p>
              </div>

              <div className="hidden sm:flex items-center gap-2">
                <span className="text-xs font-medium text-slate-500">
                  Showing <span className="font-bold text-slate-800">{filteredTasks.length}</span> of {tasks.length} tasks
                </span>
              </div>
            </div>

            {/* Filters, Search & Status Tabs */}
            <FilterTabs
              stats={stats}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              selectedPriority={selectedPriority}
              setSelectedPriority={setSelectedPriority}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              onResetFilters={resetFilters}
            />

            {/* Task List */}
            <TaskList
              tasks={filteredTasks}
              onEdit={handleOpenEditForm}
              onDelete={(task) => setTaskToDelete(task)}
              onStatusChange={handleStatusChange}
              onAddNew={handleOpenCreateForm}
            />
          </section>
        </main>
      </div>

      {/* Floating Add Task Button for Mobile */}
      <button
        onClick={handleOpenCreateForm}
        className="lg:hidden fixed right-5 bottom-20 z-40 w-13 h-13 rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-300 flex items-center justify-center hover:bg-indigo-700 active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-indigo-300"
        aria-label="Add new task"
      >
        <Plus className="w-6 h-6 stroke-[2.5]" />
      </button>

      {/* Mobile Bottom Navigation */}
      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Create / Edit Task Modal */}
      <TaskForm
        isOpen={isTaskFormOpen}
        onClose={() => setIsTaskFormOpen(false)}
        onSave={handleSaveTask}
        taskToEdit={taskToEdit}
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={Boolean(taskToDelete)}
        onClose={() => setTaskToDelete(null)}
        onConfirm={handleConfirmDelete}
        task={taskToDelete}
      />
    </div>
  );
}
