// Study mode — no timer, immediate explanation
function StudyMode({ onHome }) {
  const { useState, useMemo } = React;
  const Q = window.PMP_QUESTIONS || [];
  const [domain, setDomain] = useState('all');
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const filtered = useMemo(() => {
    const list = domain === 'all' ? Q : Q.filter(q => q.domain === domain);
    return window.PMP_HELPERS.shuffle(list);
  }, [domain]);

  const q = filtered[idx];
  if (!q) return <div className="p-10 text-center">Aucune question.</div>;

  const next = () => {
    setIdx((idx + 1) % filtered.length);
    setSelected(null);
    setRevealed(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 animate-fade-in">
      <div className="flex flex-wrap gap-2 items-center mb-5">
        <h2 className="text-xl sm:text-2xl font-black flex-1">📚 Mode Étude</h2>
        <button onClick={onHome} className="text-xs px-3 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 font-semibold">← Accueil</button>
      </div>

      {/* Domain filters */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {[
          { id: 'all', label: 'Tous les domaines' },
          { id: 'People', label: 'Personnes' },
          { id: 'Process', label: 'Processus' },
          { id: 'Business', label: 'Environnement' }
        ].map(d => (
          <button key={d.id} onClick={() => { setDomain(d.id); setIdx(0); setSelected(null); setRevealed(false); }}
            className={`text-xs sm:text-sm font-semibold px-3 py-2 rounded-lg transition ${domain === d.id ? 'bg-brand-500 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>
            {d.label}
          </button>
        ))}
      </div>

      <div className="text-xs text-slate-500 mb-3">
        Question {idx + 1} / {filtered.length} — pas de timer, explication après chaque réponse.
      </div>

      <QuestionCard
        question={q}
        index={idx}
        total={filtered.length}
        selected={selected}
        onSelect={(letter) => { setSelected(letter); setRevealed(true); }}
        showExplanation={revealed}
        marked={false}
        onToggleMark={() => {}}
      />

      <div className="mt-6 flex flex-wrap gap-2 justify-between">
        <button onClick={() => { setRevealed(true); }}
          disabled={revealed}
          className="px-4 py-2.5 rounded-xl bg-amber-200 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200 disabled:opacity-50 font-semibold text-sm">
          👁 Révéler la réponse
        </button>
        <button onClick={next}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-purple-600 text-white font-bold text-sm">
          Question suivante →
        </button>
      </div>
    </div>
  );
}
window.StudyMode = StudyMode;
