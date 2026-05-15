// Grid of question buttons for quick navigation
function NavigationGrid({ questions, answers, marked, currentIdx, sectionRange, onJump, onClose }) {
  const [start, end] = sectionRange || [0, questions.length];
  return (
    <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-2xl max-h-[85vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg">Navigation</h3>
            <p className="text-xs text-slate-500 mt-0.5">Cliquez sur un numéro pour y aller</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700">✕</button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <Legend />
          <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 mt-3">
            {questions.slice(start, end).map((q, localIdx) => {
              const globalIdx = start + localIdx;
              const ans = answers[globalIdx];
              const isMarked = marked[globalIdx];
              const isCurrent = globalIdx === currentIdx;
              let cls = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
              if (ans) cls = 'bg-brand-500 text-white';
              if (isMarked) cls = 'bg-amber-400 text-amber-950';
              if (isMarked && ans) cls = 'bg-gradient-to-br from-brand-500 to-amber-400 text-white';
              if (isCurrent) cls += ' ring-2 ring-offset-2 ring-brand-600 dark:ring-offset-slate-900';
              return (
                <button key={globalIdx}
                  onClick={() => { onJump(globalIdx); onClose(); }}
                  className={`h-10 rounded-lg font-bold text-sm ${cls} hover:scale-105 transition`}>
                  {globalIdx + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function Legend() {
  const items = [
    { color: 'bg-slate-100 dark:bg-slate-800', label: 'Non répondu' },
    { color: 'bg-brand-500', label: 'Répondu' },
    { color: 'bg-amber-400', label: 'Marqué' },
    { color: 'bg-gradient-to-br from-brand-500 to-amber-400', label: 'Marqué + répondu' }
  ];
  return (
    <div className="flex flex-wrap gap-3 text-xs">
      {items.map((it, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <div className={`w-4 h-4 rounded ${it.color}`}></div>
          <span className="text-slate-600 dark:text-slate-400">{it.label}</span>
        </div>
      ))}
    </div>
  );
}
window.NavigationGrid = NavigationGrid;
