// Review screen — go through each question with full explanation
function ReviewScreen({ data, onBack, onHome }) {
  const { useState } = React;
  const { questions, answers } = data;
  const [idx, setIdx] = useState(0);
  const [filter, setFilter] = useState('all'); // all | wrong | unanswered | marked

  // Build filtered list
  const indexes = questions.map((_, i) => i).filter(i => {
    if (filter === 'all') return true;
    const ua = answers[i];
    const ok = ua && (questions[i].correct || '').toUpperCase().includes(ua);
    if (filter === 'wrong') return ua && !ok;
    if (filter === 'unanswered') return !ua;
    return true;
  });

  if (indexes.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10 text-center">
        <p className="text-lg">Aucune question pour ce filtre.</p>
        <button onClick={() => setFilter('all')} className="mt-4 px-4 py-2 rounded-lg bg-brand-500 text-white">Tout afficher</button>
      </div>
    );
  }

  const safeIdx = Math.min(idx, indexes.length - 1);
  const realIdx = indexes[safeIdx];
  const q = questions[realIdx];
  const ua = answers[realIdx];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 animate-fade-in">
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <h2 className="text-xl sm:text-2xl font-black flex-1">📖 Révision détaillée</h2>
        <button onClick={onBack} className="text-xs px-3 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 font-semibold">← Résultats</button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {[
          { id: 'all', label: 'Toutes', count: questions.length },
          { id: 'wrong', label: 'Erreurs', count: questions.filter((qq,i) => answers[i] && !(qq.correct || '').toUpperCase().includes(answers[i])).length },
          { id: 'unanswered', label: 'Non répondues', count: questions.filter((_,i) => !answers[i]).length }
        ].map(f => (
          <button key={f.id} onClick={() => { setFilter(f.id); setIdx(0); }}
            className={`text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-lg transition ${filter === f.id ? 'bg-brand-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
            {f.label} <span className="opacity-70">({f.count})</span>
          </button>
        ))}
      </div>

      <div className="text-xs text-slate-500 mb-3">
        Question <b>{safeIdx + 1}</b> sur <b>{indexes.length}</b> (n° original : {realIdx + 1})
        {ua ? (
          (q.correct || '').toUpperCase().includes(ua)
            ? <span className="ml-2 inline-block px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold">✓ Correct</span>
            : <span className="ml-2 inline-block px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-semibold">✕ Incorrect (votre rép. : {ua})</span>
        ) : (
          <span className="ml-2 inline-block px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-semibold">Non répondue</span>
        )}
      </div>

      <QuestionCard
        question={q}
        index={realIdx}
        total={questions.length}
        selected={ua}
        onSelect={() => {}}
        showExplanation={true}
        marked={false}
        onToggleMark={() => {}}
      />

      <div className="mt-6 flex gap-2 justify-between">
        <button onClick={() => setIdx(Math.max(0, safeIdx - 1))} disabled={safeIdx === 0}
          className="px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 disabled:opacity-40 font-semibold text-sm">← Précédente</button>
        <button onClick={onHome} className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 font-semibold text-sm">🏠 Accueil</button>
        <button onClick={() => setIdx(Math.min(indexes.length - 1, safeIdx + 1))} disabled={safeIdx === indexes.length - 1}
          className="px-4 py-2.5 rounded-xl bg-brand-500 text-white disabled:opacity-40 font-semibold text-sm">Suivante →</button>
      </div>
    </div>
  );
}
window.ReviewScreen = ReviewScreen;
