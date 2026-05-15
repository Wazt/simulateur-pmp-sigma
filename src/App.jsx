// Root App — manages navigation between views
function App() {
  const { useState, useEffect } = React;
  const [view, setView] = useState('home');     // home | exam | study | assistant | results | review
  const [examMode, setExamMode] = useState('exam'); // 'exam' | 'mini'
  const [examData, setExamData] = useState(null);   // result of an exam session
  const [darkMode, setDarkMode] = useState(() => {
    const saved = window.PMP_HELPERS.loadSession('dark');
    if (saved !== null) return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    window.PMP_HELPERS.saveSession('dark', darkMode);
  }, [darkMode]);

  const handleStart = (mode) => {
    if (mode === 'exam') { setExamMode('exam'); setView('exam'); }
    else if (mode === 'mini') { setExamMode('mini'); setView('exam'); }
    else setView(mode);
  };

  const handleFinish = (data) => {
    setExamData(data);
    setView('results');
    window.scrollTo({ top: 0 });
  };

  const handleAbort = () => {
    if (window.confirm('Voulez-vous vraiment abandonner cet examen ? Votre progression sera perdue.')) {
      setView('home');
    }
  };

  return (
    <div className="min-h-screen">
      <Header darkMode={darkMode} onToggleDark={() => setDarkMode(d => !d)}
        onGoHome={() => setView('home')} view={view} />

      {view === 'home' && <Home onStart={handleStart} />}
      {view === 'exam' && <ExamScreen mode={examMode} onFinish={handleFinish} onAbort={handleAbort} />}
      {view === 'study' && <StudyMode onHome={() => setView('home')} />}
      {view === 'assistant' && <Assistant onHome={() => setView('home')} />}
      {view === 'results' && examData && (
        <ResultsScreen data={examData}
          onReview={() => setView('review')}
          onRestart={() => { setView('exam'); }}
          onHome={() => setView('home')} />
      )}
      {view === 'review' && examData && (
        <ReviewScreen data={examData}
          onBack={() => setView('results')}
          onHome={() => setView('home')} />
      )}

      <footer className="mt-12 py-6 px-4 text-center text-xs text-slate-500 border-t border-slate-200 dark:border-slate-800">
        <p>Simulateur PMP — Banque de questions basée sur le PMBOK 7 et l'Agile Practice Guide.</p>
        <p className="mt-1">Application pédagogique. PMP® est une marque déposée du Project Management Institute.</p>
      </footer>
    </div>
  );
}
window.App = App;
