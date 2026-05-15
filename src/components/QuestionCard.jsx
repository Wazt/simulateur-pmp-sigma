// One question + 4 options + (optional) explanation
function QuestionCard({ question, index, total, selected, onSelect, showExplanation, marked, onToggleMark }) {
  const opts = question.options || {};
  const order = ['A','B','C','D'].filter(k => opts[k]);
  const isCorrect = (k) => {
    const c = (question.correct || '').toUpperCase();
    // support multi-letter answers like "AB"
    return c.includes(k);
  };

  return (
    <div className="animate-slide-up">
      {/* Question meta */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
          Question {index + 1} <span className="text-slate-400">/ {total}</span>
        </span>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full text-white ${window.PMP_HELPERS.domainColor(question.domain)}`}>
          {question.domain === 'People' ? 'Personnes' : question.domain === 'Process' ? 'Processus' : 'Environnement'}
        </span>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
          {window.PMP_HELPERS.approachLabel(question.approach)}
        </span>
        <button
          onClick={onToggleMark}
          className={`ml-auto text-xs font-semibold px-3 py-1.5 rounded-lg transition ${marked ? 'bg-amber-400 text-amber-950' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-amber-100 dark:hover:bg-amber-900/30'}`}>
          {marked ? '🔖 Marquée' : '🔖 Marquer'}
        </button>
      </div>

      {/* Question */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <p className="question-text text-base sm:text-lg font-medium text-slate-900 dark:text-slate-100">
          {question.question}
        </p>
      </div>

      {/* Options */}
      <div className="mt-4 space-y-3">
        {order.map(k => {
          const isSelected = selected === k;
          const correct = isCorrect(k);
          let cls = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-brand-400 dark:hover:border-brand-600';
          if (isSelected && !showExplanation) cls = 'bg-brand-50 dark:bg-brand-950/50 border-brand-500';
          if (showExplanation) {
            if (correct) cls = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500';
            else if (isSelected) cls = 'bg-rose-50 dark:bg-rose-950/40 border-rose-500';
            else cls = 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-70';
          }
          return (
            <button key={k}
              onClick={() => !showExplanation && onSelect(k)}
              disabled={showExplanation}
              className={`choice-card w-full text-left p-4 sm:p-5 rounded-xl border-2 ${cls} disabled:cursor-default`}>
              <div className="flex items-start gap-3">
                <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm border-2 ${
                  showExplanation && correct ? 'border-emerald-500 bg-emerald-500 text-white' :
                  showExplanation && isSelected ? 'border-rose-500 bg-rose-500 text-white' :
                  isSelected ? 'border-brand-500 bg-brand-500 text-white' :
                  'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}>{k}</div>
                <div className="flex-1 pt-1 text-sm sm:text-base text-slate-700 dark:text-slate-200">
                  {opts[k]}
                </div>
                {showExplanation && correct && <span className="text-emerald-600 text-xl">✓</span>}
                {showExplanation && isSelected && !correct && <span className="text-rose-600 text-xl">✕</span>}
              </div>
            </button>
          );
        })}
      </div>

      {/* Explanation (study/results mode) */}
      {showExplanation && question.explanation && (
        <div className="mt-5 p-5 rounded-2xl bg-gradient-to-br from-brand-50 to-purple-50 dark:from-brand-950/30 dark:to-purple-950/30 border border-brand-200 dark:border-brand-900 animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">💡</span>
            <span className="font-bold text-brand-900 dark:text-brand-100">
              Réponse correcte : <span className="text-emerald-600 dark:text-emerald-400">{question.correct}</span>
            </span>
          </div>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
window.QuestionCard = QuestionCard;
