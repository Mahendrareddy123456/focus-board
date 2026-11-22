import React from 'react';
import { 
  Calendar, 
  Edit3, 
  Trash2, 
  Check
} from 'lucide-react';

export function TaskCard({ 
  task, 
  onEdit, 
  onDelete, 
  onStatusChange 
}) {
  const isCompleted = task.status === 'Completed';
  const isInProgress = task.status === 'In progress';

  const handleToggleStatus = () => {
    if (isCompleted) {
      onStatusChange(task.id, 'To do');
    } else if (isInProgress) {
      onStatusChange(task.id, 'Completed');
    } else {
      onStatusChange(task.id, 'In progress');
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-amber-50 text-amber-700 border-amber-200/80';
      case 'Medium':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200/80';
      case 'Low':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'No due date';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className={`group bg-white rounded-2xl p-4 sm:p-5 border transition-all duration-200 hover:shadow-md ${
      isCompleted 
        ? 'border-slate-200/60 bg-slate-50/40 opacity-80 hover:opacity-100' 
        : 'border-slate-200/90 shadow-xs hover:border-indigo-200'
    }`}>
      <div className="flex items-start gap-3.5">
        <button
          onClick={handleToggleStatus}
          className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 ${
            isCompleted
              ? 'bg-emerald-500 text-white shadow-xs'
              : isInProgress
              ? 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50'
              : 'border-2 border-slate-300 text-transparent hover:border-slate-400'
          }`}
          aria-label={`Mark task "${task.title}" as ${isCompleted ? 'To do' : 'Completed'}`}
          title={`Status: ${task.status} (click to toggle)`}
        >
          {isCompleted && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          {isInProgress && <div className="w-2 h-2 rounded-full bg-indigo-600" />}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
            <h3 className={`text-sm sm:text-base font-bold text-slate-900 truncate ${
              isCompleted ? 'line-through text-slate-400' : ''
            }`}>
              {task.title}
            </h3>

            <div className="flex items-center gap-1 self-end sm:self-center">
              <button
                onClick={() => onEdit(task)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label={`Edit task ${task.title}`}
                title="Edit task"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(task)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500"
                aria-label={`Delete task ${task.title}`}
                title="Delete task"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {task.description && (
            <p className={`text-xs sm:text-sm text-slate-500 line-clamp-2 mb-3 leading-relaxed ${
              isCompleted ? 'text-slate-400' : ''
            }`}>
              {task.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
            <span className="px-2.5 py-0.5 rounded-md font-semibold text-[11px] bg-slate-100 text-slate-600">
              {task.category || 'General'}
            </span>

            <span className={`px-2.5 py-0.5 rounded-md font-semibold text-[11px] border ${getPriorityBadge(task.priority)}`}>
              {task.priority} Priority
            </span>

            <select
              value={task.status}
              onChange={(e) => onStatusChange(task.id, e.target.value)}
              aria-label={`Change status for task ${task.title}`}
              className="text-[11px] font-semibold bg-slate-50 hover:bg-slate-100 border border-slate-200/90 text-slate-700 rounded-md px-2 py-0.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="To do">To do</option>
              <option value="In progress">In progress</option>
              <option value="Completed">Completed</option>
            </select>

            <div className="ml-auto flex items-center gap-1.5 text-slate-400 text-xs font-medium">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{formatDate(task.dueDate)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
