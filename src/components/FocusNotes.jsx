import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    tag: 'FOCUS NOTES · 01 / 03',
    title: 'Make today count.',
    subtitle: 'A little bit of daily progress adds up to big things.',
    previewTitle: 'Design landing page',
    previewBadge: 'Focus',
    progress: 65,
    previewStatus: 'In progress',
    accentColor: 'from-indigo-600 via-indigo-700 to-purple-800'
  },
  {
    id: 2,
    tag: 'FOCUS NOTES · 02 / 03',
    title: 'Small steps, big progress.',
    subtitle: 'Break down complex tasks and tackle them one by one.',
    previewTitle: 'Fix mobile navigation',
    previewBadge: 'Next up',
    progress: 40,
    previewStatus: 'In progress',
    accentColor: 'from-indigo-700 via-purple-700 to-indigo-900'
  },
  {
    id: 3,
    tag: 'FOCUS NOTES · 03 / 03',
    title: 'Celebrate the wins.',
    subtitle: 'Every completed task moves you forward towards your goals.',
    previewTitle: 'Review onboarding copy',
    previewBadge: 'Done',
    progress: 100,
    previewStatus: 'Completed',
    accentColor: 'from-purple-700 via-indigo-600 to-blue-800'
  }
];

export function FocusNotes() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const slide = SLIDES[currentSlide];

  return (
    <section 
      aria-roledescription="carousel" 
      aria-label="Focus Notes"
      className="relative rounded-2xl overflow-hidden shadow-lg shadow-indigo-900/10 transition-all duration-300"
    >
      <div className={`w-full bg-gradient-to-r ${slide.accentColor} p-6 sm:p-8 text-white relative overflow-hidden transition-all duration-500`}>
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-indigo-500/20 blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-xl space-y-2.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-bold tracking-wider text-indigo-100 uppercase border border-white/10">
              <Sparkles className="w-3 h-3 text-indigo-200" />
              <span>{slide.tag}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
              {slide.title}
            </h2>

            <p className="text-indigo-100/90 text-sm sm:text-base leading-relaxed font-normal">
              {slide.subtitle}
            </p>

            <div className="flex items-center gap-2 pt-2" role="tablist" aria-label="Slide indicators">
              {SLIDES.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white ${
                    currentSlide === idx ? 'w-7 bg-white shadow-sm' : 'w-2 bg-white/35 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${idx + 1}: ${s.title}`}
                  aria-selected={currentSlide === idx}
                  role="tab"
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 self-start lg:self-center">
            <div className="bg-white text-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xl border border-white/20 min-w-[220px] sm:min-w-[260px] transform hover:scale-[1.02] transition-transform duration-200">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-600">
                  {slide.previewBadge}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  {slide.progress}%
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 truncate mb-3">
                {slide.previewTitle}
              </h4>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-700 ease-out ${
                    slide.progress === 100 ? 'bg-emerald-500' : 'bg-indigo-600'
                  }`}
                  style={{ width: `${slide.progress}%` }}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/35 active:scale-95 text-white backdrop-blur-md flex items-center justify-center border border-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/35 active:scale-95 text-white backdrop-blur-md flex items-center justify-center border border-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
