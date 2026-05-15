// Main exam screen — orchestrates questions, timer, sections, breaks
function ExamScreen({ mode, onFinish, onAbort }) {
  const { useState, useEffect, useMemo, useRef } = React;
  const Q = window.PMP_QUESTIONS || [];

  // Config per mode
  const config = useMemo(() => {
    if (mode === 'mini') {
      return { count: 60, totalSec: 75 * 60, sections: [[0,60]], breakAfter: [] };
    }
    // Full official exam: 180 questions, 230 min, 2 breaks (after Q60 and Q120)
    return { count: 180, totalSec: 230 * 60, sections: [[0,60],[60,120],[120,180]], breakAfter: [60,120] };
  }, [mode]);

  // Build exam questions: sample + shuffle for replayability
  const questions = useMemo(() => {
    const shuffled = window.PMP_HELPERS.shuffle(Q);
    return shuffled.slice(0, config.count);
  }, [config.count]);

  // State
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({}); // idx -> 'A'|'B'|'C'|'D'
  const [marked, setMarked] = useState({});
  const [remaining, setRemaining] = useState(config.totalSec);
  const [sectionIdx, setSectionIdx] = useState(0);
  const [onBreak, setOnBreak] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);

  // Timer
  useEffect(() => {
    if (onBreak) return;
    if (remaining <= 0) return;
    const id = setInterval(() => setRemaining(r => Math.max(0, r - 1)), 1000);
    return () => clearInterval(id);
  }, [onBreak, remaining]);

  // Auto-submit when time is over
  useEffect(() => {
    if (remaining === 0 && !onBreak) {
      handleSubmit();
    }
  }, [remaining]);

  const [secStart, secEnd] = config.sections[sectionIdx];
  const sectionAnswered = Object.keys(answers).filter(k => +k >= secStart && +k < secEnd).length;
  const sectionTotal = secEnd - secStart;
  const allAnswered = Object.keys(answers).length;

  const setAnswer = (idx, letter) => {
    setAnswers(prev => ({ ...prev, [idx]: letter }));
  };
  const toggleMark = (idx) => {
    setMarked(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const goNext = () => {
    if (currentIdx + 1 >= secEnd) {
      // End of section
      if (config.breakAfter.includes(secEnd) && sectionIdx + 1 < config.sections.length) {
        setOnBreak(true);
      } else if (sectionIdx + 1 < config.sections.length) {
        setSectionIdx(sectionIdx + 1);
        setCurrentIdx(secEnd);
      } else {
        setShowConfirmSubmit(true);
      }
    } else {
      setCurrentIdx(currentIdx + 1);
    }
  };
  const goPrev = () => {
    if (currentIdx > secStart) setCurrentIdx(currentIdx - 1);
  };
  const jumpTo = (idx) => {
    if (idx >= secStart && idx < secEnd) setCurrentIdx(idx);
  };
  const resumeFromBreak = () => {
    setOnBreak(false);
    setSectionIdx(sectionIdx + 1);
    setCurrentIdx(config.sections[sectionIdx + 1][0]);
  };
  const handleSubmit = () => {
    const elapsed = config.totalSec - remaining;
    onFinish({ questions, answers, marked, elapsed, mode });
  };

  if (onBreak) {
    return <BreakScreen section={sectionIdx + 1} totalSections={config.sections.length} breakSec={10 * 60} onResume={resumeFromBreak} />;
  }

  const q = questions[currentIdx];
  const overallPct = Math.round(((currentIdx + 1) / questions.length) * 100);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 sm:py-6 animate-fade-in">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
        <div className="flex items-center gap-3 text-xs sm:text-sm">
          <div className="font-bold">
            Section <span className="text-brand-600">{sectionIdx + 1}</span>/{config.sections.length}
          </div>
          <div className="text-slate-500">|</div>
          <div className="text-slate-600 dark:text-slate-400">
            {sectionAnswered}/{sectionTotal} répondues
          </div>
        </div>
        <Timer totalSec={config.totalSec} remaining={remaining} onExpire={handleSubmit} />
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 mb-6 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-brand-500 to-purple-500 transition-all" style={{ width: overallPct + '%' }}></div>
      </div>

      {/* Question */}
      <QuestionCard
        question={q}
        index={currentIdx}
        total={questions.length}
        selected={answers[currentIdx]}
        onSelect={(letter) => setAnswer(currentIdx, letter)}
        showExplanation={false}
        marked={!!marked[currentIdx]}
        onToggleMark={() => toggleMark(currentIdx)}
      />

      {/* Action bar */}
      <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
        <button onClick={goPrev} disabled={currentIdx <= secStart}
          className="px-4 py-3 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed font-semibold text-sm">
          ← Précédente
        </button>
        <button onClick={() => setShowNav(true)}
          className="px-4 py-3 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 font-semibold text-sm">
          ☷ Navigation
        </button>
        <div className="flex-1"></div>
        <button onClick={goNext}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-purple-600 text-white font-bold text-sm hover:shadow-lg transition">
          {currentIdx + 1 >= secEnd ? (sectionIdx + 1 < config.sections.length ? 'Section suivante →' : 'Soumettre l\'examen ✓') : 'Suivante →'}
        </button>
      </div>

      {/* Abort link */}
      <div className="mt-8 text-center">
        <button onClick={onAbort} className="text-xs text-slate-500 hover:text-rose-600">
          Abandonner l'examen
        </button>
      </div>

      {/* Navigation modal */}
      {showNav && (
        <NavigationGrid questions={questions} answers={answers} marked={marked} currentIdx={currentIdx}
          sectionRange={[secStart, secEnd]} onJump={jumpTo} onClose={() => setShowNav(false)} />
      )}

      {/* Confirm submit */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 max-w-md w-full">
            <h3 className="font-bold text-xl mb-2">Soumettre l'examen ?</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Vous avez répondu à <b>{allAnswered}/{questions.length}</b> questions.
              {allAnswered < questions.length && <span className="text-amber-600"> Les questions sans réponse seront comptées comme incorrectes.</span>}
            </p>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowConfirmSubmit(false)} className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 font-semibold text-sm">Continuer</button>
              <button onClick={handleSubmit} className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold text-sm">Soumettre</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
window.ExamScreen = ExamScreen;
