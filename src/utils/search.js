// Fuzzy search engine for the Assistant feature
// Searches the question bank and knowledge base
window.PMP_SEARCH = (() => {
  // Common French stopwords to remove from query
  const STOP = new Set([
    'le','la','les','un','une','des','du','de','d','et','ou','où','à','au','aux','en','dans',
    'pour','par','sur','sous','avec','sans','est','sont','être','un','une','que','qui','dont',
    'ce','cette','ces','son','sa','ses','leur','leurs','il','elle','ils','elles','on','nous','vous',
    'l','s','t','n','y','si','mais','plus','tout','toute','tous','toutes','peut','doit','faire','fait',
    'a','ont','être','était','sera','va','vont','aussi','très','bien','aussi'
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

  function searchQuestions(query, opts = {}) {
    const qt = tokenize(query);
    if (qt.length === 0) return [];
    const questions = window.PMP_QUESTIONS || [];
    const scored = questions.map(q => {
      const opts = Object.values(q.options || {}).join(' ');
      const txt = q.question + ' ' + opts + ' ' + (q.explanation || '');
      return { q, score: scoreText(qt, txt) };
    });
    return scored
      .filter(s => s.score > 0)
      .sort((a,b) => b.score - a.score)
      .slice(0, opts.limit || 5);
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
    const matches = searchQuestions(query, { limit: 3 });
    const knowledge = searchKnowledge(query, { limit: 4 });
    return {
      query,
      bestMatch: matches[0] || null,
      otherMatches: matches.slice(1),
      knowledge: knowledge.map(x => x.k),
      confidence: matches[0] ? Math.min(100, Math.round(matches[0].score * 5)) : 0
    };
  }

  return { tokenize, searchQuestions, searchKnowledge, suggestAnswer };
})();
