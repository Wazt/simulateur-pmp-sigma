// Helper utilities
window.PMP_HELPERS = {
  formatTime(sec) {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    if (h > 0) return `${h}h ${String(m).padStart(2,'0')}m ${String(s).padStart(2,'0')}s`;
    return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  },
  shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },
  pickRandom(arr, n) {
    return window.PMP_HELPERS.shuffle(arr).slice(0, n);
  },
  saveSession(key, data) {
    try { localStorage.setItem('pmp_' + key, JSON.stringify(data)); } catch(e){}
  },
  loadSession(key) {
    try {
      const s = localStorage.getItem('pmp_' + key);
      return s ? JSON.parse(s) : null;
    } catch(e){ return null; }
  },
  clearSession(key) {
    try { localStorage.removeItem('pmp_' + key); } catch(e){}
  },
  domainLabel(d) {
    return { 'People': 'Personnes (42 %)', 'Process': 'Processus (50 %)', 'Business': 'Environnement (8 %)' }[d] || d;
  },
  domainColor(d) {
    return { 'People':'bg-rose-500','Process':'bg-indigo-500','Business':'bg-amber-500' }[d] || 'bg-slate-500';
  },
  approachLabel(a) {
    return { 'Predictive':'Prédictif','Agile':'Agile','Hybride':'Hybride' }[a] || a;
  }
};
