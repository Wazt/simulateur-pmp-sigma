// Mode « Questions Exam réel » — banque dédiée issue d'un examen réel (151 questions),
// réponses et explications sourcées exclusivement sur PMBOK 6, PMBOK 7 et le Guide de pratique Agile
function RealExamMode({ onHome }) {
  const { useState, useMemo } = React;
  const ALL = window.PMP_REAL_QUESTIONS || [];
  const H = window.PMP_HELPERS;
  const saved = H.loadSession('real_state') || {};
  const [domain, setDomain] = useState(saved.domain || 'all');
  const [idx, setIdx] = useState(saved.idx || 0);
  const [picked, setPicked] = useState([]);
  const [revealed, setRevealed] = useState(false);
  const [stats, setStats] = useState({ answered: 0, good: 0 });

  const list = useMemo(() => (domain === 'all' ? ALL : ALL.filter(q => q.domain === domain)), [domain]);
  const safeIdx = Math.min(idx, Math.max(0, list.length - 1));
  const q = list[safeIdx];
  if (!q) return <div className="p-10 text-center">Aucune question.</div>;

  const persist = (d, i) => H.saveSession('real_state', { domain: d, idx: i });
  const goTo = (i) => { setIdx(i); setPicked([]); setRevealed(false); persist(domain, i); };
  const changeDomain = (d) => { setDomain(d); setIdx(0); setPicked([]); setRevealed(false); persist(d, 0); };

  const multi = q.selectCount > 1;
  const correctSet = (q.correct || '').split('');
  const isGood = (sel) => sel.length === correctSet.length && correctSet.every(L => sel.includes(L));
  const reveal = (sel) => {
    setRevealed(true);
    setStats(s => ({ answered: s.answered + 1, good: s.good + (isGood(sel) ? 1 : 0) }));
  };
  const clickOption = (L) => {
    if (revealed) return;
    if (!multi) { setPicked([L]); reveal([L]); return; }
    setPicked(p => p.includes(L) ? p.filter(x => x !== L) : (p.length < q.selectCount ? [...p, L] : p));
  };

  const order = ['A', 'B', 'C', 'D', 'E'].filter(k => q.options[k]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 animate-fade-in">
      <div className="flex flex-wrap gap-2 items-center mb-4">
        <h2 className="text-xl sm:text-2xl font-black flex-1">🎓 Questions Exam réel</h2>
        <button onClick={onHome} className="text-xs px-3 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 font-semibold">← Accueil</button>
      </div>

      <div className="mb-5 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-xs text-amber-800 dark:text-amber-300">
        Banque dédiée : {ALL.length} questions issues d'un examen réel. Réponses et explications établies exclusivement à partir des guides officiels <b>PMBOK 6</b>, <b>PMBOK 7</b> et <b>Guide de pratique Agile</b>.
      </div>

      {/* Filtres domaine */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {[
          { id: 'all', label: 'Toutes' },
          { id: 'People', label: 'Personnes' },
          { id: 'Process', label: 'Processus' },
          { id: 'Business', label: 'Environnement' }
        ].map(d => (
          <button key={d.id} onClick={() => changeDomain(d.id)}
            className={`text-xs sm:text-sm font-semibold px-3 py-2 rounded-lg transition ${domain === d.id ? 'bg-brand-500 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>
            {d.label}
          </button>
        ))}
        <div className="ml-auto text-xs text-slate-500 self-center">
          Session : {stats.good} ✓ / {stats.answered} répondues
        </div>
      </div>

      {/* Méta question */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
          Question {safeIdx + 1} <span className="text-slate-400">/ {list.length}</span>
          <span className="ml-2 text-slate-400 font-normal">(n° {q.num} du PDF)</span>
        </span>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full text-white ${H.domainColor(q.domain)}`}>
          {q.domain === 'People' ? 'Personnes' : q.domain === 'Process' ? 'Processus' : 'Environnement'}
        </span>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
          {H.approachLabel(q.approach)}
        </span>
        {multi && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-500 text-white">
            Choisissez {q.selectCount} réponses
          </span>
        )}
      </div>

      {/* Question */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <p className="question-text text-base sm:text-lg font-medium text-slate-900 dark:text-slate-100">{q.question}</p>
      </div>

      {/* Options */}
      <div className="mt-4 space-y-3">
        {order.map(k => {
          const isSelected = picked.includes(k);
          const correct = correctSet.includes(k);
          let cls = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-brand-400 dark:hover:border-brand-600';
          if (isSelected && !revealed) cls = 'bg-brand-50 dark:bg-brand-950/50 border-brand-500';
          if (revealed) {
            if (correct) cls = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500';
            else if (isSelected) cls = 'bg-rose-50 dark:bg-rose-950/40 border-rose-500';
            else cls = 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-70';
          }
          return (
            <button key={k} onClick={() => clickOption(k)} disabled={revealed}
              className={`choice-card w-full text-left p-4 sm:p-5 rounded-xl border-2 ${cls} disabled:cursor-default`}>
              <div className="flex items-start gap-3">
                <div className={`flex-shrink-0 w-9 h-9 ${multi ? 'rounded-lg' : 'rounded-full'} flex items-center justify-center font-bold text-sm border-2 ${
                  revealed && correct ? 'border-emerald-500 bg-emerald-500 text-white' :
                  revealed && isSelected ? 'border-rose-500 bg-rose-500 text-white' :
                  isSelected ? 'border-brand-500 bg-brand-500 text-white' :
                  'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}>{k}</div>
                <div className="flex-1 pt-1 text-sm sm:text-base text-slate-700 dark:text-slate-200">{q.options[k]}</div>
                {revealed && correct && <span className="text-emerald-600 text-xl">✓</span>}
                {revealed && isSelected && !correct && <span className="text-rose-600 text-xl">✕</span>}
              </div>
            </button>
          );
        })}
      </div>

      {/* Validation multi-réponses */}
      {multi && !revealed && (
        <button onClick={() => reveal(picked)} disabled={picked.length !== q.selectCount}
          className="mt-4 w-full px-5 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-purple-600 text-white font-bold disabled:opacity-40">
          Valider ({picked.length}/{q.selectCount} sélectionnées)
        </button>
      )}

      {/* Explication + référence officielle */}
      {revealed && (
        <div className="mt-5 p-5 rounded-2xl bg-gradient-to-br from-brand-50 to-purple-50 dark:from-brand-950/30 dark:to-purple-950/30 border border-brand-200 dark:border-brand-900 animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{isGood(picked) ? '✅' : '💡'}</span>
            <span className="font-bold text-brand-900 dark:text-brand-100">
              Réponse correcte : <span className="text-emerald-600 dark:text-emerald-400">{q.correct.split('').join(', ')}</span>
            </span>
          </div>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{q.explanation}</p>
          {q.source_ref && (
            <div className="mt-3 pt-3 border-t border-brand-200/60 dark:border-brand-900/60 text-xs text-slate-600 dark:text-slate-400">
              📖 <b>Référence :</b> {q.source_ref}
            </div>
          )}
          {q.notes && (
            <div className="mt-2 text-xs text-amber-700 dark:text-amber-400">⚠️ {q.notes}</div>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="mt-6 flex gap-2 justify-between">
        <button onClick={() => goTo(Math.max(0, safeIdx - 1))} disabled={safeIdx === 0}
          className="px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 disabled:opacity-40 font-semibold text-sm">← Précédente</button>
        <button onClick={onHome} className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 font-semibold text-sm">🏠 Accueil</button>
        <button onClick={() => goTo(Math.min(list.length - 1, safeIdx + 1))} disabled={safeIdx === list.length - 1}
          className="px-4 py-2.5 rounded-xl bg-brand-500 text-white disabled:opacity-40 font-semibold text-sm">Suivante →</button>
      </div>
    </div>
  );
}
window.RealExamMode = RealExamMode;
