// Countdown timer with visual urgency
function Timer({ totalSec, remaining, onExpire }) {
  const { useEffect, useRef } = React;
  const tickedRef = useRef(false);

  useEffect(() => {
    if (remaining <= 0 && !tickedRef.current) {
      tickedRef.current = true;
      onExpire && onExpire();
    }
  }, [remaining, onExpire]);

  const pct = totalSec > 0 ? (remaining / totalSec) * 100 : 0;
  let color = 'text-emerald-600 dark:text-emerald-400';
  let bg = 'bg-emerald-500';
  if (pct < 50) { color = 'text-amber-600 dark:text-amber-400'; bg = 'bg-amber-500'; }
  if (pct < 20) { color = 'text-rose-600 dark:text-rose-400'; bg = 'bg-rose-500'; }

  return (
    <div className="flex items-center gap-2">
      <div className={`text-xs sm:text-sm font-mono font-bold tabular-nums ${color} ${pct < 10 ? 'animate-pulse' : ''}`}>
        ⏱ {window.PMP_HELPERS.formatTime(Math.max(0, remaining))}
      </div>
      <div className="hidden sm:block w-24 h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
        <div className={`h-full ${bg} transition-all duration-1000`} style={{ width: pct + '%' }}></div>
      </div>
    </div>
  );
}
window.Timer = Timer;
