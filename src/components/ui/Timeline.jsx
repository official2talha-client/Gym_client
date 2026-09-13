export default function Timeline({ items }) {
  if (!items?.length) return null
  return (
    <ol className="relative space-y-5 border-l border-white/10 pl-6">
      {items.map((item) => (
        <li key={item.id} className="relative">
          <span className="absolute -left-[29px] flex h-3.5 w-3.5 items-center justify-center rounded-full bg-accent ring-4 ring-base-card" />
          <div className="flex items-start gap-3">
            {item.icon && <span className="mt-0.5 text-accent-light">{item.icon}</span>}
            <div>
              <p className="text-sm text-white">{item.text}</p>
              <p className="text-xs text-ink-muted">{item.time}</p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  )
}
