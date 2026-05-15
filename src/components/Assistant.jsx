// Assistant PMP — paste text or upload a screenshot, get matching questions and PMP knowledge
function Assistant({ onHome }) {
  const { useState, useRef } = React;
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [ocrStatus, setOcrStatus] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const fileRef = useRef(null);

  const search = (q) => {
    const r = window.PMP_SEARCH.suggestAnswer(q);
    setResult(r);
    setTimeout(() => {
      const el = document.getElementById('assistant-result');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSubmit = () => {
    if (!text.trim()) return;
    search(text.trim());
  };

  const handleImage = async (file) => {
    if (!file) return;
    setImagePreview(URL.createObjectURL(file));
    setOcrStatus('Chargement du moteur OCR…');
    try {
      // Lazy load tesseract.js
      if (!window.Tesseract) {
        await loadScript('https://unpkg.com/tesseract.js@5/dist/tesseract.min.js');
      }
      setOcrStatus('Analyse de l\'image en cours…');
      const { data } = await window.Tesseract.recognize(file, 'fra+eng', {
        logger: m => {
          if (m.status === 'recognizing text') {
            setOcrStatus(`Reconnaissance du texte… ${Math.round(m.progress * 100)}%`);
          }
        }
      });
      const extracted = (data.text || '').trim();
      setText(extracted);
      setOcrStatus(`✓ ${extracted.length} caractères extraits`);
      if (extracted.length > 10) search(extracted);
    } catch (e) {
      setOcrStatus('❌ Erreur OCR. Essayez de coller le texte manuellement.');
      console.error(e);
    }
  };

  const loadScript = (src) => new Promise((res, rej) => {
    const s = document.createElement('script');
    s.src = src; s.onload = res; s.onerror = rej;
    document.head.appendChild(s);
  });

  const onDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) handleImage(file);
  };

  // Try to detect question and options in pasted text
  const parsedQuestion = parseQuestionText(text);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 animate-fade-in">
      <div className="flex flex-wrap gap-2 items-center mb-5">
        <h2 className="text-2xl sm:text-3xl font-black flex-1">🤖 Assistant PMP</h2>
        <button onClick={onHome} className="text-xs px-3 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 font-semibold">← Accueil</button>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
        Collez une question PMP (texte), ou téléversez une capture d'écran. L'assistant cherche dans la banque de 180 questions et la base de connaissances PMBOK 7 / Agile Practice Guide pour vous proposer la réponse la plus probable et son explication.
      </p>

      {/* Input area */}
      <div className="space-y-4">
        {/* Image upload + drop zone */}
        <div
          onDragOver={e => e.preventDefault()}
          onDrop={onDrop}
          onClick={() => fileRef.current?.click()}
          className="cursor-pointer p-6 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-brand-500 dark:hover:border-brand-500 hover:bg-brand-50/40 dark:hover:bg-brand-950/20 transition text-center">
          <input ref={fileRef} type="file" accept="image/*" className="hidden"
            onChange={e => handleImage(e.target.files?.[0])} />
          <div className="text-4xl mb-2">📸</div>
          <div className="font-bold mb-1">Téléverser une capture d'écran</div>
          <div className="text-xs text-slate-500">Glissez-déposez ou cliquez. OCR (français + anglais) via Tesseract.js.</div>
          {imagePreview && (
            <img src={imagePreview} alt="aperçu" className="mt-4 mx-auto max-h-48 rounded-lg shadow-md" />
          )}
          {ocrStatus && <div className="mt-3 text-xs font-mono text-brand-600 dark:text-brand-400">{ocrStatus}</div>}
        </div>

        {/* Text area */}
        <div>
          <label className="text-xs font-bold text-slate-500 mb-1 block">Ou collez la question ici</label>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Exemple : Un membre de l'équipe agile a quitté en plein sprint. Le retard s'accumule. Que doit faire le chef de projet ?"
            rows={6}
            className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <div className="flex gap-2 mt-2">
            <button onClick={handleSubmit} disabled={!text.trim()}
              className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-purple-600 text-white font-bold disabled:opacity-40">
              🔍 Trouver la réponse
            </button>
            <button onClick={() => { setText(''); setResult(null); setImagePreview(null); setOcrStatus(''); }}
              className="px-4 py-3 rounded-xl bg-slate-200 dark:bg-slate-800 font-semibold text-sm">
              Effacer
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {result && <AssistantResult result={result} id="assistant-result" />}
    </div>
  );
}

function parseQuestionText(text) {
  if (!text) return null;
  // try to find options A, B, C, D
  const optPat = /([A-Da-d])[\.\-\)]\s*([^\n]+)/g;
  const opts = {};
  let m;
  while ((m = optPat.exec(text)) !== null) {
    const k = m[1].toUpperCase();
    if (!opts[k]) opts[k] = m[2].trim();
  }
  return Object.keys(opts).length >= 2 ? opts : null;
}

function AssistantResult({ result, id }) {
  const { bestMatch, otherMatches, knowledge, confidence, query } = result;

  return (
    <div id={id} className="mt-8 space-y-4 animate-fade-in">
      <div className="p-5 rounded-2xl bg-gradient-to-br from-brand-50 to-purple-50 dark:from-brand-950/30 dark:to-purple-950/30 border border-brand-200 dark:border-brand-900">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-lg">🎯 Analyse de la question</h3>
          {bestMatch && (
            <div className="text-xs font-bold px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-brand-200 dark:border-brand-800">
              Confiance : {confidence}%
            </div>
          )}
        </div>

        {!bestMatch && (
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Aucune correspondance trouvée dans la banque. Essayez avec plus de mots-clés (concepts PMP : risque, sprint, partie prenante, etc.).
          </p>
        )}

        {bestMatch && (
          <div className="mt-3 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-2">Meilleure correspondance dans la banque PMP</div>
            <p className="font-medium text-sm sm:text-base mb-3">{bestMatch.q.question}</p>
            {Object.entries(bestMatch.q.options).map(([k, v]) => {
              const correct = (bestMatch.q.correct || '').includes(k);
              return (
                <div key={k} className={`flex gap-2 p-2.5 rounded-lg mb-1 text-sm ${correct ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800' : 'bg-slate-50 dark:bg-slate-900'}`}>
                  <span className={`font-bold w-6 ${correct ? 'text-emerald-700 dark:text-emerald-300' : 'text-slate-500'}`}>{k}.</span>
                  <span className="flex-1">{v}</span>
                  {correct && <span className="text-emerald-600">✓</span>}
                </div>
              );
            })}
            <div className="mt-4 p-3 rounded-lg bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-900">
              <div className="text-xs font-bold text-brand-700 dark:text-brand-300 mb-1">
                💡 Réponse recommandée : <span className="text-emerald-600 dark:text-emerald-400 text-base">{bestMatch.q.correct}</span>
                <span className="ml-2 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800">
                  {bestMatch.q.domain === 'People' ? 'Personnes' : bestMatch.q.domain === 'Process' ? 'Processus' : 'Environnement'} • {window.PMP_HELPERS.approachLabel(bestMatch.q.approach)}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{bestMatch.q.explanation}</p>
            </div>
          </div>
        )}
      </div>

      {/* Other matches */}
      {otherMatches && otherMatches.length > 0 && (
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <h3 className="font-bold mb-3">📋 Questions similaires</h3>
          <div className="space-y-2">
            {otherMatches.map((m, i) => (
              <details key={i} className="rounded-lg border border-slate-200 dark:border-slate-800 p-3">
                <summary className="cursor-pointer font-medium text-sm">{m.q.question.substring(0, 140)}{m.q.question.length > 140 ? '…' : ''}</summary>
                <div className="mt-3 text-xs">
                  {Object.entries(m.q.options).map(([k, v]) => {
                    const ok = (m.q.correct || '').includes(k);
                    return <div key={k} className={ok ? 'text-emerald-600 dark:text-emerald-400 font-semibold py-1' : 'text-slate-600 dark:text-slate-400 py-0.5'}>{k}. {v} {ok && '✓'}</div>;
                  })}
                  <div className="mt-2 text-xs italic text-slate-600 dark:text-slate-400">{m.q.explanation}</div>
                </div>
              </details>
            ))}
          </div>
        </div>
      )}

      {/* Knowledge */}
      {knowledge && knowledge.length > 0 && (
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <h3 className="font-bold mb-3">📖 Concepts PMP pertinents</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {knowledge.map((k, i) => (
              <div key={i} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <div className="text-xs font-bold text-brand-700 dark:text-brand-300 mb-1">{k.topic}</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">{k.summary}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
window.Assistant = Assistant;
