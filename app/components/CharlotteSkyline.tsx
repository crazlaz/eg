export default function CharlotteSkyline({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1200 675" className={className} role="img" aria-label="Charlotte, NC skyline">
      <defs>
        <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,.25)" />
          <stop offset="100%" stopColor="rgba(255,255,255,.05)" />
        </linearGradient>
      </defs>
      <rect width="1200" height="675" fill="url(#grad)" />
      <circle cx="900" cy="120" r="90" fill="rgba(255,255,255,.08)" />
      <g fill="rgba(0,0,0,.35)" stroke={`rgba(255,255,255,.1)`}>
        <rect x="120" y="260" width="90" height="280" />
        <rect x="220" y="220" width="120" height="320" />
        <rect x="360" y="200" width="80" height="340" />
        <rect x="460" y="240" width="110" height="300" />
        <g>
          <rect x="600" y="140" width="120" height="400" />
          <polygon points="660,60 640,140 680,140" fill="rgba(0,0,0,.35)" />
        </g>
        <rect x="740" y="230" width="100" height="310" />
        <rect x="860" y="260" width="90" height="280" />
        <rect x="960" y="210" width="120" height="330" />
      </g>
      <g fill={`rgba(var(--accent-r), var(--accent-g), var(--accent-b), .45)`}>
        <rect x="0" y="520" width="1200" height="80" />
        <rect x="80" y="480" width="120" height="120" />
        <rect x="280" y="500" width="90" height="100" />
        <rect x="480" y="470" width="110" height="130" />
        <rect x="720" y="490" width="140" height="110" />
        <rect x="980" y="480" width="160" height="120" />
      </g>
      <rect x="0" y="600" width="1200" height="75" fill="rgba(0,0,0,.6)" />
    </svg>
  );
}
