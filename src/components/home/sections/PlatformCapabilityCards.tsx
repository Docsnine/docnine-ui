import type { ReactNode } from "react"

function CardShell({ children }: { children: ReactNode }) {
  return (
    <div className="group relative flex min-h-[300px] flex-col overflow-hidden rounded-2xl border border-border bg-[#0b0f0e] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] dark:bg-[#0a0d0c]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(13,148,136,0.12),transparent_55%)]" />
      {children}
    </div>
  )
}

function SvgScan() {
  return (
    <svg viewBox="0 0 400 220" className="h-full w-full" fill="none" aria-hidden>
      <defs>
        <linearGradient id="scanGlow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#0d9488" stopOpacity="0" />
        </linearGradient>
        <filter id="scanBlur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      <rect x="42" y="28" width="230" height="150" rx="14" fill="#111816" stroke="#1f2d2a" strokeWidth="1.25" />
      <rect x="58" y="46" width="92" height="7" rx="3.5" fill="#2a3b37" />
      <rect x="58" y="66" width="168" height="5" rx="2.5" fill="#1c2926" />
      <rect x="58" y="82" width="148" height="5" rx="2.5" fill="#1c2926" />
      <rect x="58" y="98" width="176" height="5" rx="2.5" fill="#1c2926" />
      <rect x="58" y="114" width="120" height="5" rx="2.5" fill="#1c2926" />
      <rect x="58" y="130" width="156" height="5" rx="2.5" fill="#1c2926" />
      <rect x="58" y="146" width="84" height="5" rx="2.5" fill="#1c2926" />

      <path d="M268 18 L356 188" stroke="url(#scanGlow)" strokeWidth="2" />
      <ellipse cx="312" cy="104" rx="34" ry="34" fill="#0d9488" opacity="0.15" filter="url(#scanBlur)" />
      <circle cx="312" cy="104" r="22" fill="#0f1f1c" stroke="#2dd4bf" strokeWidth="1.75" />
      <circle cx="312" cy="104" r="11" stroke="#2dd4bf" strokeWidth="1.5" />
      <path d="M328 120l12 12" stroke="#2dd4bf" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function SvgSync() {
  return (
    <svg viewBox="0 0 400 220" className="h-full w-full" fill="none" aria-hidden>
      <defs>
        <linearGradient id="syncLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0d9488" stopOpacity="0" />
          <stop offset="45%" stopColor="#2dd4bf" stopOpacity="1" />
          <stop offset="100%" stopColor="#0d9488" stopOpacity="0.1" />
        </linearGradient>
        <filter id="syncGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="8" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path d="M28 168 C110 48, 210 36, 372 150" stroke="url(#syncLine)" strokeWidth="1.75" />
      <path d="M48 178 C130 78, 220 66, 360 162" stroke="#0d9488" strokeWidth="1.25" opacity="0.35" />
      <path d="M68 186 C145 102, 230 92, 348 170" stroke="#0d9488" strokeWidth="1" opacity="0.18" />

      <g filter="url(#syncGlow)">
        <circle cx="206" cy="96" r="36" fill="#0d9488" opacity="0.12" />
        <circle cx="206" cy="96" r="26" fill="#101816" stroke="#2dd4bf" strokeWidth="1.5" />
        <path
          d="M194 96c0-7 5.5-12.5 12.5-12.5 4.2 0 7.9 2 10.2 5.1"
          stroke="#2dd4bf"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M218 96c0 7-5.5 12.5-12.5 12.5-4.2 0-7.9-2-10.2-5.1"
          stroke="#2dd4bf"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path d="M214 82l4 7h-7M198 110l-4-7h7" fill="#2dd4bf" />
      </g>
      <circle cx="118" cy="118" r="3" fill="#2dd4bf" opacity="0.8" />
      <circle cx="292" cy="108" r="2.5" fill="#5eead4" opacity="0.7" />
    </svg>
  )
}

function SvgAccess() {
  const rows = [
    { label: "Editor", active: false, y: 42 },
    { label: "Admin", active: true, y: 92 },
    { label: "Collaborator", active: false, y: 142 },
  ] as const

  return (
    <svg viewBox="0 0 400 220" className="h-full w-full" fill="none" aria-hidden>
      <defs>
        <filter id="accessGlow" x="-20%" y="-40%" width="140%" height="180%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {rows.map((row) => (
        <g key={row.label} filter={row.active ? "url(#accessGlow)" : undefined}>
          <rect
            x="54"
            y={row.y}
            width="292"
            height="40"
            rx="10"
            fill={row.active ? "rgba(13,148,136,0.14)" : "#121918"}
            stroke={row.active ? "#2dd4bf" : "#1e2b28"}
            strokeWidth={row.active ? 1.5 : 1.25}
          />
          <rect
            x="66"
            y={row.y + 8}
            width="24"
            height="24"
            rx="7"
            fill={row.active ? "rgba(45,212,191,0.18)" : "#1a2422"}
            stroke={row.active ? "#2dd4bf" : "#2a3834"}
            strokeWidth="1.25"
          />
          <circle
            cx="78"
            cy={row.y + 17}
            r="3.5"
            fill={row.active ? "#2dd4bf" : "#5b6b67"}
          />
          <path
            d={`M71.5 ${row.y + 26}c1.8-3.2 4.2-4.8 6.5-4.8s4.7 1.6 6.5 4.8`}
            stroke={row.active ? "#2dd4bf" : "#5b6b67"}
            strokeWidth="1.35"
            strokeLinecap="round"
          />
          <text
            x="104"
            y={row.y + 25}
            fill={row.active ? "#ecfdf8" : "#6b7c78"}
            style={{ fontSize: 13, fontFamily: "ui-sans-serif, system-ui, sans-serif", fontWeight: 500 }}
          >
            {row.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

function SvgConnect() {
  return (
    <svg viewBox="0 0 400 220" className="h-full w-full" fill="none" aria-hidden>
      <defs>
        <linearGradient id="waveA" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0d9488" stopOpacity="0" />
          <stop offset="35%" stopColor="#2dd4bf" stopOpacity="0.85" />
          <stop offset="70%" stopColor="#a3e635" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#0d9488" stopOpacity="0" />
        </linearGradient>
        <filter id="iconShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#000" floodOpacity="0.45" />
        </filter>
      </defs>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <path
          key={i}
          d={`M-20 ${36 + i * 16} C 70 ${18 + i * 16}, 150 ${58 + i * 16}, 230 ${30 + i * 16} S 330 ${50 + i * 16}, 420 ${36 + i * 16}`}
          stroke="url(#waveA)"
          strokeWidth="1.4"
          opacity={0.22 + i * 0.07}
        />
      ))}

      {[
        {
          x: 78,
          label: "Laravel",
          icon: (
            <g transform="translate(10 12)">
              <path
                d="M4 10.5c.5-1.5 1.8-1.8 3.1-1L18 16c.9.5 1.4 1.5 1.1 2.5l-1.9 5.5c-.4 1.2-1.2 1.7-2.4 1.4L2.2 20.2C1 19.8.6 18.7 1.1 17.5L4 10.5z"
                fill="#FF2D20"
              />
              <path
                d="M22 7.5c.6-1.4 1.9-1.6 3.1-.7l11 7.2c.9.6 1.3 1.6.9 2.6L34 24.2c-.5 1.3-1.5 1.8-2.7 1.4L16.8 21c-1.3-.4-1.7-1.6-1.1-2.8L22 7.5z"
                fill="#FF2D20"
                opacity="0.85"
              />
              <path
                d="M13.5 26.5c.5-1.1 1.6-1.3 2.7-.7l12.8 7c.9.5 1.3 1.5.9 2.4l-2.1 5.5c-.4 1.1-1.4 1.5-2.4 1.1L9.6 34.8c-1.2-.4-1.5-1.5-1-2.5l4.9-5.8z"
                fill="#FF2D20"
              />
            </g>
          ),
        },
        {
          x: 172,
          label: "JavaScript",
          icon: (
            <g transform="translate(14 14)">
              <rect width="36" height="36" rx="7" fill="#F7DF1E" />
              <text
                x="18"
                y="25"
                textAnchor="middle"
                fill="#323330"
                style={{ fontSize: 15, fontFamily: "ui-sans-serif, system-ui, sans-serif", fontWeight: 800 }}
              >
                JS
              </text>
            </g>
          ),
        },
        {
          x: 266,
          label: "Markdown",
          icon: (
            <g transform="translate(11 16)">
              <rect width="42" height="32" rx="6" fill="#0b0f0e" stroke="#e5e7eb" strokeWidth="1.6" />
              <text
                x="21"
                y="21.5"
                textAnchor="middle"
                fill="#e5e7eb"
                style={{ fontSize: 12, fontFamily: "ui-sans-serif, system-ui, sans-serif", fontWeight: 700 }}
              >
                MD
              </text>
            </g>
          ),
        },
      ].map((item) => (
        <g key={item.label} transform={`translate(${item.x} 74)`} filter="url(#iconShadow)">
          <rect width="64" height="64" rx="14" fill="#121918" stroke="#243330" strokeWidth="1.25" />
          {item.icon}
          <title>{item.label}</title>
        </g>
      ))}
    </svg>
  )
}

function SvgCollaborate() {
  return (
    <svg viewBox="0 0 400 220" className="h-full w-full" fill="none" aria-hidden>
      <rect x="34" y="22" width="332" height="168" rx="14" fill="#101614" stroke="#1e2b28" strokeWidth="1.25" />
      <path d="M34 54h332" stroke="#1e2b28" strokeWidth="1" />
      <rect x="34" y="22" width="332" height="32" rx="14" fill="#141c1a" />
      <rect x="34" y="42" width="332" height="12" fill="#141c1a" />

      {[
        { x: 52, label: "Guide.md", active: true, w: 54 },
        { x: 120, label: "API.md", active: false, w: 40 },
        { x: 176, label: "Schema", active: false, w: 44 },
        { x: 236, label: "README", active: false, w: 48 },
      ].map((tab) => (
        <g key={tab.label}>
          <text
            x={tab.x}
            y="42"
            fill={tab.active ? "#ecfdf8" : "#5b6b67"}
            style={{ fontSize: 11, fontFamily: "ui-sans-serif, system-ui, sans-serif", fontWeight: tab.active ? 600 : 450 }}
          >
            {tab.label}
          </text>
          {tab.active && <rect x={tab.x} y="50" width={tab.w} height="2" rx="1" fill="#2dd4bf" />}
        </g>
      ))}

      <rect x="56" y="74" width="150" height="5" rx="2.5" fill="#2a3834" />
      <rect x="56" y="92" width="220" height="5" rx="2.5" fill="#222f2c" />
      <rect x="56" y="110" width="188" height="5" rx="2.5" fill="#222f2c" />
      <rect x="56" y="128" width="140" height="5" rx="2.5" fill="#222f2c" />
      <rect x="56" y="146" width="204" height="5" rx="2.5" fill="#222f2c" />
      <rect x="56" y="164" width="112" height="5" rx="2.5" fill="#222f2c" />

      <g>
        <rect x="214" y="70" width="62" height="17" rx="4" fill="#a855f7" />
        <text x="222" y="82" fill="#fff" style={{ fontSize: 9, fontFamily: "ui-sans-serif, system-ui, sans-serif", fontWeight: 650 }}>
          Agent 130
        </text>
        <path d="M220 87v12l7-5z" fill="#a855f7" />
      </g>
      <g>
        <rect x="118" y="104" width="62" height="17" rx="4" fill="#3b82f6" />
        <text x="126" y="116" fill="#fff" style={{ fontSize: 9, fontFamily: "ui-sans-serif, system-ui, sans-serif", fontWeight: 650 }}>
          Agent 152
        </text>
        <path d="M124 121v12l7-5z" fill="#3b82f6" />
      </g>
      <g>
        <rect x="268" y="140" width="54" height="17" rx="4" fill="#f97316" />
        <text x="276" y="152" fill="#fff" style={{ fontSize: 9, fontFamily: "ui-sans-serif, system-ui, sans-serif", fontWeight: 650 }}>
          User 007
        </text>
        <path d="M274 157v12l7-5z" fill="#f97316" />
      </g>
    </svg>
  )
}

function SvgAsk() {
  return (
    <svg viewBox="0 0 400 220" className="h-full w-full" fill="none" aria-hidden>
      <defs>
        <filter id="askGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="10" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <ellipse cx="200" cy="118" rx="120" ry="70" fill="#0d9488" opacity="0.08" filter="url(#askGlow)" />

      <g>
        <rect x="56" y="40" width="196" height="52" rx="16" fill="rgba(13,148,136,0.16)" stroke="#2dd4bf" strokeWidth="1.25" />
        <rect x="74" y="56" width="128" height="6" rx="3" fill="rgba(94,234,212,0.55)" />
        <rect x="74" y="72" width="86" height="6" rx="3" fill="rgba(94,234,212,0.3)" />
      </g>

      <g>
        <rect x="128" y="110" width="210" height="58" rx="16" fill="#141c1a" stroke="#243330" strokeWidth="1.25" />
        <rect x="146" y="128" width="148" height="6" rx="3" fill="#2a3834" />
        <rect x="146" y="144" width="108" height="6" rx="3" fill="#222f2c" />
      </g>

      <g filter="url(#askGlow)">
        <circle cx="318" cy="168" r="22" fill="#0d9488" />
        <path d="M310 168h16M318 160v16" stroke="#ecfdf8" strokeWidth="2.25" strokeLinecap="round" />
      </g>
    </svg>
  )
}

const PLATFORM_CARDS = [
  {
    title: "Scan your repositories",
    description: "Pull structure from your code and map endpoints, schemas, and modules automatically.",
    Visual: SvgScan,
  },
  {
    title: "Keep docs up to date",
    description: "When the code changes, your docs can follow , so pages don’t go stale after every merge.",
    Visual: SvgSync,
  },
  {
    title: "Control who sees what",
    description: "Share privately with your team, or publish only what partners and customers need.",
    Visual: SvgAccess,
  },
  {
    title: "Connect your stack",
    description: "Work with the git providers and export formats you already rely on day to day.",
    Visual: SvgConnect,
  },
  {
    title: "Collaborate in one place",
    description: "Review and edit docs together without bouncing between half a dozen tools.",
    Visual: SvgCollaborate,
  },
  {
    title: "Ask your codebase",
    description: "Get answers grounded in the project you’re documenting , not generic guesses.",
    Visual: SvgAsk,
  },
] as const

export function PlatformCapabilityCards() {
  return (
    <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {PLATFORM_CARDS.map(({ title, description, Visual }) => (
        <CardShell key={title}>
          <div className="relative min-h-[190px] flex-1 overflow-hidden">
            <Visual />
          </div>
          <div className="relative z-[1] border-t border-white/6 bg-black/20 px-5 py-4 backdrop-blur-[2px]">
            <h3 className="text-[15px] font-semibold tracking-tight text-white">{title}</h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-white/55">{description}</p>
          </div>
        </CardShell>
      ))}
    </div>
  )
}
