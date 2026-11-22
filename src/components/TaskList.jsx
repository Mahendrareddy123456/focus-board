import React from 'react';
import { TaskCard } from './TaskCard';
import { ClipboardList, Plus } from 'lucide-react';

export function TaskList({ 
  tasks, 
  onEdit, 
  onDelete, 
  onStatusChange, 
  onAddNew 
}) {
  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-10 text-center border border-slate-200/80 shadow-xs">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500 mb-4">
          <ClipboardList className="w-7 h-7" />
        </div>
        <h4 className="text-base font-bold text-slate-800 mb-1">No tasks found</h4>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto mb-5 leading-relaxed">
          No tasks match your current search and filter criteria. Try adjusting filters or create a new task.
        </p>
        <button
          onClick={onAddNew}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <Plus className="w-4 h-4" />
          <span>Create new task</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3" role="list" aria-label="Task list">
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}
