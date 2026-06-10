// Home / Landing screen — choose mode
function Home({ onStart }) {
  const totalQ = (window.PMP_QUESTIONS || []).length;
  const cards = [
    {
      id: 'exam',
      icon: '🎯',
      title: 'Examen Officiel',
      subtitle: '430 questions • 230 min • 2 pauses',
      desc: 'Reproduit les conditions réelles du PMP : timer chronométré, 2 pauses obligatoires (après Q60 et Q120), pas de retour arrière après soumission de section.',
      gradient: 'from-brand-600 via-indigo-600 to-purple-600',
      action: () => onStart('exam')
    },
    {
      id: 'study',
      icon: '📚',
      title: 'Mode Étude',
      subtitle: 'Sans timer • Explication immédiate',
      desc: 'Réponds à ton rythme et obtiens une explication détaillée après chaque question. Idéal pour apprendre et comprendre les concepts PMBOK 7 & Agile.',
      gradient: 'from-emerald-500 via-teal-600 to-cyan-600',
      action: () => onStart('study')
    },
    {
      id: 'mini',
      icon: '⚡',
      title: 'Mini-examen',
      subtitle: '60 questions • 75 min',
      desc: 'Version condensée pour un entraînement rapide. Distribution équilibrée Personnes / Processus / Environnement.',
      gradient: 'from-orange-500 via-rose-500 to-pink-600',
      action: () => onStart('mini')
    },
    {
      id: 'assistant',
      icon: '🤖',
      title: 'Assistant PMP',
      subtitle: 'Texte ou capture d\'écran',
      desc: 'Colle une question, ou téléverse une capture d\'écran. L\'assistant retrouve la réponse et l\'explication basées sur la banque de connaissances PMBOK 7 et Agile Guide.',
      gradient: 'from-fuchsia-500 via-violet-600 to-indigo-600',
      action: () => onStart('assistant')
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 animate-fade-in">
      {/* Hero */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/50 text-brand-700 dark:text-brand-300 text-xs font-semibold mb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-soft"></span>
          {totalQ} questions • PMBOK 7 • Agile Practice Guide
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4">
          Réussissez votre <span className="gradient-text">examen PMP</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Simulateur complet en français avec questions issues de vrais examens, explications détaillées et règles officielles du PMI.
        </p>
      </div>

      {/* Mode cards */}
      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-12">
        {cards.map(c => (
          <button key={c.id} onClick={c.action}
            className="group relative overflow-hidden rounded-2xl p-6 sm:p-8 text-left bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-300 dark:hover:border-brand-700 shadow-sm hover:shadow-xl transition-all">
            <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${c.gradient} opacity-10 group-hover:opacity-20 transition`}></div>
            <div className={`text-3xl sm:text-4xl mb-3`}>{c.icon}</div>
            <h3 className="text-xl sm:text-2xl font-bold mb-1">{c.title}</h3>
            <div className="text-xs font-semibold text-brand-600 dark:text-brand-400 mb-3">{c.subtitle}</div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{c.desc}</p>
            <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-400 group-hover:gap-2 transition-all">
              Commencer
              <span>→</span>
            </div>
          </button>
        ))}
      </div>

      {/* Info section */}
      <div className="grid sm:grid-cols-3 gap-4">
        <InfoCard icon="👥" title="Personnes" pct="42 %" color="from-rose-500 to-pink-500"
          desc="Leadership, équipe, conflit, parties prenantes." />
        <InfoCard icon="⚙️" title="Processus" pct="50 %" color="from-indigo-500 to-blue-500"
          desc="Planification, exécution, risque, qualité, changement." />
        <InfoCard icon="🏢" title="Environnement" pct="8 %" color="from-amber-500 to-orange-500"
          desc="Stratégie, bénéfices, conformité, organisation." />
      </div>

      <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-brand-50 to-purple-50 dark:from-brand-950/30 dark:to-purple-950/30 border border-brand-100 dark:border-brand-900">
        <h3 className="font-bold mb-2 text-brand-900 dark:text-brand-100">📋 Règles officielles de l'examen PMP</h3>
        <ul className="text-sm space-y-1 text-slate-700 dark:text-slate-300">
          <li>• <b>180 questions</b> en <b>230 minutes</b> (≈ 1 min 16 s par question)</li>
          <li>• <b>2 pauses optionnelles de 10 min</b> après les questions 60 et 120</li>
          <li>• Une fois une section validée, <b>retour arrière impossible</b></li>
          <li>• Domaines : <b>Personnes 42 %</b> • <b>Processus 50 %</b> • <b>Environnement 8 %</b></li>
          <li>• Approches : <b>Prédictive</b> ≈ 50 % • <b>Agile/Hybride</b> ≈ 50 %</li>
        </ul>
      </div>
    </div>
  );
}

function InfoCard({ icon, title, pct, desc, color }) {
  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between mb-2">
        <div className="text-2xl">{icon}</div>
        <div className={`text-xs font-bold px-2 py-1 rounded-full text-white bg-gradient-to-r ${color}`}>{pct}</div>
      </div>
      <h4 className="font-bold mb-1">{title}</h4>
      <p className="text-xs text-slate-600 dark:text-slate-400">{desc}</p>
    </div>
  );
}
window.Home = Home;
