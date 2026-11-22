import React from 'react';
import { Menu, Bell, ChevronRight, Sparkles } from 'lucide-react';

export function Header({ activeTab, onOpenMobileMenu, onResetSampleData }) {
  return (
    <header className="h-16 lg:h-20 bg-white/80 backdrop-blur-md border-b border-slate-200/70 sticky top-0 z-30 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 -ml-1 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Open mobile menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-400 font-medium">
          <span className="hover:text-slate-600 transition-colors">Application</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="text-slate-700 font-semibold">{activeTab}</span>
        </nav>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button
          onClick={onResetSampleData}
          title="Reset tasks to initial sample dataset"
          className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-indigo-600 hover:bg-indigo-50/70 px-2.5 py-1.5 rounded-lg border border-slate-200/80 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span>Reset Sample</span>
        </button>

        <button
          className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors relative focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="View notifications"
        >
          <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full ring-2 ring-white" />
        </button>

        <div className="h-6 w-[1px] bg-slate-200 hidden sm:block" />

        <div className="flex items-center gap-3 pl-1">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-sm ring-2 ring-indigo-100 cursor-pointer">
            JD
          </div>
          <div className="hidden md:block text-left">
            <span className="block text-xs font-semibold text-slate-800 leading-tight">Jordan Doe</span>
            <span className="block text-[11px] text-slate-400">Product Lead</span>
          </div>
        </div>
      </div>
    </header>
  );
}
