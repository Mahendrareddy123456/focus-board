import { useState, useEffect, useMemo } from 'react';
import { INITIAL_TASKS } from '../data/initialTasks';

const STORAGE_KEY = 'focusboard_tasks_v1';

export function useTasks() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.error('Error reading tasks from localStorage:', err);
    }
    return INITIAL_TASKS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (err) {
      console.error('Error saving tasks to localStorage:', err);
    }
  }, [tasks]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const inProgress = tasks.filter(t => t.status === 'In progress').length;
    const completed = tasks.filter(t => t.status === 'Completed').length;
    const todo = tasks.filter(t => t.status === 'To do').length;
    const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      inProgress,
      completed,
      todo,
      completionPercentage
    };
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = searchQuery.trim() === '' || 
        task.title.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase().trim());

      const matchesStatus = selectedStatus === 'All' || task.status === selectedStatus;
      const matchesPriority = selectedPriority === 'All' || task.priority === selectedPriority;
      const matchesCategory = selectedCategory === 'All' || task.category === selectedCategory;

      return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
    });
  }, [tasks, searchQuery, selectedStatus, selectedPriority, selectedCategory]);

  const addTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: `TASK-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString()
    };
    setTasks(prev => [newTask, ...prev]);
    return newTask;
  };

  const updateTask = (id, updatedFields) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updatedFields } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const updateTaskStatus = (id, newStatus) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, status: newStatus } : task
    ));
  };

  const resetToSampleData = () => {
    setTasks(INITIAL_TASKS);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TASKS));
    } catch (err) {
      console.error('Error resetting tasks:', err);
    }
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedStatus('All');
    setSelectedPriority('All');
    setSelectedCategory('All');
  };

  return {
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
  };
}
