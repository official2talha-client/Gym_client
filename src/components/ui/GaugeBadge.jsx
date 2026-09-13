/**
 * Circular gauge/dial badge with a play-button-style center. Reused verbatim
 * across: hero trust signal (rating), BMI calculator result, and the member
 * dashboard's weekly-goal ring -- keep the visual language identical across
 * all three so members recognize it as "the same dial" everywhere.
 */
export default function GaugeBadge({
  percent = 75,
  size = 96,
  strokeWidth = 8,
  label,
  centerLabel,
  tone = 'accent',
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const clamped = Math.max(0, Math.min(100, percent))
  const dash = (clamped / 100) * circumference

  const trackColor = 'rgba(255,255,255,0.08)'
  const fillColor = tone === 'accent' ? '#F56A1F' : '#FFFFFF'

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={trackColor} strokeWidth={strokeWidth} />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={fillColor}
            strokeWidth={strokeWidth}
            strokeDasharray={`${dash} ${circumference - dash}`}
            strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 0.8s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-base-card/80">
          <span className="font-display text-lg text-white">{centerLabel ?? `${Math.round(clamped)}%`}</span>
        </div>
      </div>
      {label && <span className="text-xs font-medium uppercase tracking-wide text-ink-muted">{label}</span>}
    </div>
  )
}
