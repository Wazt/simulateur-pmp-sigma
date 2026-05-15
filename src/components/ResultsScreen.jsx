// Results screen — score, by domain breakdown, action to review
function ResultsScreen({ data, onReview, onRestart, onHome }) {
  const { questions, answers, elapsed } = data;
  const correctIds = new Set();
  let correctCount = 0;
  const byDomain = { People: { total: 0, correct: 0 }, Process: { total: 0, correct: 0 }, Business: { total: 0, correct: 0 } };
  const byApproach = { Predictive: { total: 0, correct: 0 }, Agile: { total: 0, correct: 0 }, Hybride: { total: 0, correct: 0 } };

  questions.forEach((q, idx) => {
    const d = q.domain in byDomain ? q.domain : 'Process';
    const a = q.approach in byApproach ? q.approach : 'Predictive';
    byDomain[d].total++;
    byApproach[a].total++;
    const user = answers[idx];
    const correct = (q.correct || '').toUpperCase();
    // Match: for single letter, user matches if equal; for multi-letter (like AB), accept if user is in it
    const isOk = user && correct.includes(user);
    if (isOk) {
      correctCount++;
      correctIds.add(idx);
      byDomain[d].correct++;
      byApproach[a].correct++;
    }
  });

  const total = questions.length;
  const pct = total > 0 ? Math.round((correctCount / total) * 100) : 0;
  // PMP passing benchmark approx ~ 70% (PMI doesn't publish; this is a guideline)
  const passed = pct >= 70;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      {/* Score hero */}
      <div className="text-center mb-10">
        <div className={`inline-flex items-center justify-center w-40 h-40 sm:w-48 sm:h-48 rounded-full mb-6 ${passed ? 'bg-gradient-to-br from-emerald-400 to-green-600' : 'bg-gradient-to-br from-amber-400 to-rose-600'} shadow-2xl`}>
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-white dark:bg-slate-900 flex flex-col items-center justify-center">
            <div className="text-4xl sm:text-5xl font-black gradient-text">{pct}%</div>
            <div className="text-xs font-semibold text-slate-500 mt-1">{correctCount} / {total}</div>
          </div>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black mb-2">
          {passed ? '🎉 Félicitations !' : '💪 Continue de t\'entraîner'}
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-1">
          {passed ? 'Vous êtes au-dessus du seuil estimé de réussite (≈ 70 %).' : 'Le seuil de réussite estimé est ≈ 70 %. Reviens à la révision pour comprendre tes erreurs.'}
        </p>
        <p className="text-xs text-slate-500">Temps écoulé : {window.PMP_HELPERS.formatTime(elapsed)}</p>
      </div>

      {/* By domain */}
      <h3 className="font-bold text-lg mb-3">📊 Performance par domaine</h3>
      <div className="grid sm:grid-cols-3 gap-3 mb-6">
        {Object.entries(byDomain).map(([dom, d]) => {
          const p = d.total > 0 ? Math.round((d.correct / d.total) * 100) : 0;
          return <DomainCard key={dom} domain={dom} pct={p} correct={d.correct} total={d.total} />;
        })}
      </div>

      {/* By approach */}
      <h3 className="font-bold text-lg mb-3">🎯 Performance par approche</h3>
      <div className="grid sm:grid-cols-3 gap-3 mb-8">
        {Object.entries(byApproach).map(([app, d]) => {
          const p = d.total > 0 ? Math.round((d.correct / d.total) * 100) : 0;
          return (
            <div key={app} className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold">{window.PMP_HELPERS.approachLabel(app)}</span>
                <span className="text-lg font-black gradient-text">{p}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-brand-500 to-purple-500" style={{ width: p + '%' }}></div>
              </div>
              <div className="text-xs text-slate-500 mt-1.5">{d.correct} / {d.total}</div>
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 justify-center">
        <button onClick={onReview}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-purple-600 text-white font-bold hover:shadow-lg transition">
          📖 Réviser les réponses
        </button>
        <button onClick={onRestart}
          className="px-6 py-3 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 font-bold">
          🔄 Recommencer
        </button>
        <button onClick={onHome}
          className="px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 font-bold">
          🏠 Accueil
        </button>
      </div>
    </div>
  );
}

function DomainCard({ domain, pct, correct, total }) {
  const colors = {
    'People': { bg: 'from-rose-500 to-pink-500', label: 'Personnes (42 %)' },
    'Process': { bg: 'from-indigo-500 to-blue-500', label: 'Processus (50 %)' },
    'Business': { bg: 'from-amber-500 to-orange-500', label: 'Environnement (8 %)' }
  };
  const c = colors[domain] || colors['Process'];
  return (
    <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-bold">{c.label}</span>
        <span className="text-lg font-black gradient-text">{pct}%</span>
      </div>
      <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
        <div className={`h-full bg-gradient-to-r ${c.bg}`} style={{ width: pct + '%' }}></div>
      </div>
      <div className="text-xs text-slate-500 mt-1.5">{correct} / {total}</div>
    </div>
  );
}
window.ResultsScreen = ResultsScreen;
