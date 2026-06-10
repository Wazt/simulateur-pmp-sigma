// Fuzzy search engine for the Assistant feature
// Searches the question bank and knowledge base
window.PMP_SEARCH = (() => {
  // Common French stopwords to remove from query
  const STOP = new Set([
    'le','la','les','un','une','des','du','de','d','et','ou','où','à','au','aux','en','dans',
    'pour','par','sur','sous','avec','sans','est','sont','être','que','qui','dont',
    'ce','cette','ces','son','sa','ses','leur','leurs','il','elle','ils','elles','on','nous','vous',
    'l','s','t','n','y','si','mais','plus','tout','toute','tous','toutes','peut','doit','faire','fait',
    'a','ont','était','sera','va','vont','aussi','très','bien'
  ]);

  function tokenize(s) {
    return s.toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g,'') // remove accents
      .replace(/[^a-z0-9\s]/g,' ')
      .split(/\s+/)
      .filter(t => t.length > 2 && !STOP.has(t));
  }

  function scoreText(queryTokens, text) {
    if (!text) return 0;
    const tt = text.toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g,'');
    let score = 0;
    for (const q of queryTokens) {
      // exact word match
      const re = new RegExp('\\b' + q + '\\b', 'g');
      const m = tt.match(re);
      if (m) score += m.length * 3;
      else if (tt.includes(q)) score += 1; // partial
    }
    return score;
  }

  // Fraction of query tokens present (word-boundary) in a text — drives the real confidence
  function coverageRatio(queryTokens, text) {
    if (!text || queryTokens.length === 0) return 0;
    const tt = text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
    let hit = 0;
    for (const q of queryTokens) {
      if (new RegExp('\\b' + q + '\\b').test(tt)) hit++;
    }
    return hit / queryTokens.length;
  }

  function searchQuestions(query, options = {}) {
    const qt = tokenize(query);
    if (qt.length < 3) return []; // trop peu de tokens exploitables pour un match fiable
    const questions = window.PMP_QUESTIONS || [];

    const scored = questions.map(q => {
      const optionsStr = Object.values(q.options || {}).join(' ');
      const txt = q.question + ' ' + optionsStr + ' ' + (q.explanation || '');
      const rawScore = scoreText(qt, txt);
      // la couverture prime : quelle part des tokens de la requête se retrouve dans la question ?
      // le score de fréquence (plafonné) ne sert qu'à départager — sinon une question
      // répétant un même token ("000" dans les montants EVM) volerait le match
      const coverage = coverageRatio(qt, txt);
      const score = coverage * 100 + Math.min(10, rawScore / 10);
      return { q, score, rawScore, coverage };
    });

    const sorted = scored.filter(s => s.rawScore > 0).sort((a,b) => b.score - a.score);

    const MIN_SCORE = 6;      // ≈ 2 mots exacts minimum
    const MIN_COVERAGE = 0.3; // au moins 30 % des tokens de la requête retrouvés
    if (!sorted[0] || sorted[0].rawScore < MIN_SCORE || sorted[0].coverage < MIN_COVERAGE) return [];
    if (sorted[1] && (sorted[0].score - sorted[1].score) < 5) {
      sorted[0].ambiguous = true;
    }
    return sorted.slice(0, options.limit || 5);
  }

  function searchKnowledge(query, opts = {}) {
    const qt = tokenize(query);
    if (qt.length === 0) return [];
    const items = window.PMP_KNOWLEDGE || [];
    const scored = items.map(k => {
      const tags = (k.tags || []).join(' ');
      const txt = k.topic + ' ' + tags + ' ' + k.summary;
      return { k, score: scoreText(qt, txt) };
    });
    return scored
      .filter(s => s.score > 0)
      .sort((a,b) => b.score - a.score)
      .slice(0, opts.limit || 5);
  }

  // Heuristic answer suggestion based on best-matching question
  function suggestAnswer(query) {
    const qt = tokenize(query);
    const matches = searchQuestions(query, { limit: 3 });
    const knowledge = searchKnowledge(query, { limit: 4 });
    const best = matches[0] || null;

    // Confiance réelle = proportion des tokens de la requête retrouvés dans la question matchée
    let confidence = 0;
    if (best) {
      const txt = best.q.question + ' ' + Object.values(best.q.options || {}).join(' ');
      confidence = Math.round(coverageRatio(qt, txt) * 100);
      if (best.ambiguous) confidence = Math.min(confidence, 55);
    }

    return {
      query,
      bestMatch: best,
      otherMatches: matches.slice(1),
      knowledge: knowledge.map(x => x.k),
      confidence,
      ambiguous: !!(best && best.ambiguous)
    };
  }

  return { tokenize, searchQuestions, searchKnowledge, suggestAnswer };
})();
