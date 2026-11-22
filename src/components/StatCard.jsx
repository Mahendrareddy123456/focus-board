import React from 'react';
import { FolderKanban, Clock, CheckCircle2, TrendingUp } from 'lucide-react';

export function StatCard({ title, value, subtext, iconType, variant = 'purple' }) {
  const getIcon = () => {
    switch (iconType) {
      case 'total':
        return <FolderKanban className="w-5 h-5 text-indigo-600" />;
      case 'inProgress':
        return <Clock className="w-5 h-5 text-sky-600" />;
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      case 'rate':
        return <TrendingUp className="w-5 h-5 text-amber-600" />;
      default:
        return <FolderKanban className="w-5 h-5 text-indigo-600" />;
    }
  };

  const getBgStyle = () => {
    switch (variant) {
      case 'sky':
        return 'bg-sky-50 text-sky-600 border-sky-100';
      case 'emerald':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'amber':
        return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'purple':
      default:
        return 'bg-indigo-50 text-indigo-600 border-indigo-100';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            {title}
          </span>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {value}
          </div>
        </div>
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${getBgStyle()}`}>
          {getIcon()}
        </div>
      </div>
      
      {subtext && (
        <div className="text-xs text-slate-400 font-medium flex items-center gap-1.5 pt-1 border-t border-slate-100">
          <span>{subtext}</span>
        </div>
      )}
    </div>
  );
}
