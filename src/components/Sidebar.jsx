import React from 'react';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Calendar, 
  Settings, 
  Layers, 
  X
} from 'lucide-react';

export function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen }) {
  const navItems = [
    { id: 'Overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'My tasks', label: 'My tasks', icon: CheckSquare },
    { id: 'Calendar', label: 'Calendar', icon: Calendar },
    { id: 'Settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200/80 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Sidebar Navigation"
      >
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <div className="grid grid-cols-2 gap-1 w-4 h-4">
                <div className="bg-white rounded-[2px]" />
                <div className="bg-white rounded-[2px]" />
                <div className="bg-white rounded-[2px]" />
                <div className="bg-white rounded-[2px]" />
              </div>
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-slate-900">FocusBoard</span>
              <span className="block text-[10px] font-medium text-slate-400 tracking-wider uppercase -mt-0.5">Workspace</span>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 lg:hidden focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto">
          <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            Main Menu
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
                  isActive 
                    ? 'bg-indigo-50/80 text-indigo-700 shadow-sm font-semibold' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className={`w-5 h-5 transition-colors ${
                  isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'
                }`} />
                <span>{item.label}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-5 rounded-full bg-indigo-600" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>

        <div className="p-4 border-t border-slate-100">
          <div className="bg-gradient-to-br from-indigo-50/60 to-purple-50/60 rounded-xl p-3.5 border border-indigo-100/60 text-xs">
            <div className="flex items-center gap-2 text-indigo-900 font-semibold mb-1">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>Pro Plan Active</span>
            </div>
            <p className="text-slate-500 text-[11px] leading-relaxed mb-2.5">
              Syncing local changes seamlessly.
            </p>
            <div className="w-full bg-indigo-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-indigo-600 h-full rounded-full w-3/4" />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
