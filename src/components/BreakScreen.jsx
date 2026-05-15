// Break screen between exam sections
function BreakScreen({ section, totalSections, breakSec, onResume }) {
  const { useState, useEffect } = React;
  const [remaining, setRemaining] = useState(breakSec);

  useEffect(() => {
    if (remaining <= 0) return;
    const id = setInterval(() => setRemaining(r => Math.max(0, r - 1)), 1000);
    return () => clearInterval(id);
  }, [remaining]);

  useEffect(() => {
    if (remaining === 0) onResume();
  }, [remaining, onResume]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 animate-fade-in">
      <div className="max-w-lg w-full text-center">
        <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-2xl shadow-emerald-500/30">
          <span className="text-5xl">☕</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black mb-2">Pause obligatoire</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Vous avez terminé la section <b>{section}</b> sur <b>{totalSections}</b>. <br/>
          Profitez de cette pause de 10 minutes pour vous reposer.
        </p>
        <div className="text-6xl sm:text-7xl font-mono font-black gradient-text mb-6 tabular-nums">
          {window.PMP_HELPERS.formatTime(remaining)}
        </div>
        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-sm text-amber-900 dark:text-amber-200 mb-6">
          ⚠️ Une fois la pause terminée (ou si vous reprenez), vous ne pourrez plus revenir aux questions précédentes.
        </div>
        <button onClick={onResume}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-purple-600 text-white font-bold hover:shadow-lg transition">
          Reprendre maintenant →
        </button>
      </div>
    </div>
  );
}
window.BreakScreen = BreakScreen;
