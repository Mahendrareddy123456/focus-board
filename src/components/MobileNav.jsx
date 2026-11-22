import React from 'react';
import { LayoutDashboard, CheckSquare, Calendar, Settings } from 'lucide-react';

export function MobileNav({ activeTab, setActiveTab }) {
  const items = [
    { id: 'Overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'My tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'Calendar', label: 'Calendar', icon: Calendar },
    { id: 'Settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav 
      aria-label="Mobile Bottom Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-4 py-2 flex items-center justify-around shadow-lg shadow-slate-900/5"
    >
      {items.map(item => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all focus:outline-none ${
              isActive ? 'text-indigo-600 font-bold' : 'text-slate-400 hover:text-slate-600 font-medium'
            }`}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className="text-[10px] tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
