// Top header with branding + theme toggle
function Header({ darkMode, onToggleDark, onGoHome, view }) {
  return (
    <header className="sticky top-0 z-30 glass border-b border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <button onClick={onGoHome} className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-600 to-purple-600 flex items-center justify-center shadow-lg shadow-brand-500/30 group-hover:scale-105 transition">
            <span className="text-white font-black text-sm">PMP</span>
          </div>
          <div className="text-left">
            <div className="font-bold text-sm sm:text-base leading-tight">Simulateur PMP</div>
            <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 leading-tight">Examen officiel • PMBOK 7 + Agile</div>
          </div>
        </button>

        <div className="flex items-center gap-2">
          {view !== 'home' && (
            <button onClick={onGoHome} className="hidden sm:inline-flex text-xs font-medium px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition">
              ← Accueil
            </button>
          )}
          <button onClick={onToggleDark}
            aria-label="Basculer le thème"
            className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition">
            <span className="text-lg">{darkMode ? '☀️' : '🌙'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
window.Header = Header;
