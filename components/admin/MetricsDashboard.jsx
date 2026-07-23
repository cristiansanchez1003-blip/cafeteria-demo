'use client'

function StatCard({ label, value, sub }) {
  return (
    <div className="rounded-[18px] border border-linen bg-card p-4 shadow-card">
      <p className="text-[11px] font-black uppercase tracking-[0.16em] text-muted">{label}</p>
      <p className="mt-2 font-playfair text-3xl font-bold leading-tight text-ink">{value}</p>
      {sub && <p className="mt-1 text-[12.5px] leading-snug text-muted">{sub}</p>}
    </div>
  )
}

function EmptyState() {
  return <p className="rounded-[14px] bg-paper px-4 py-6 text-center text-[13px] font-bold text-muted">Aún no hay datos para este filtro.</p>
}

function BarList({ title, items = [], suffix = '' }) {
  const max = Math.max(1, ...items.map((item) => item.value || 0))

  return (
    <section className="rounded-[18px] border border-linen bg-card p-5 shadow-card">
      <h3 className="font-playfair text-xl font-bold text-ink">{title}</h3>
      <div className="mt-4 grid gap-3">
        {items.length === 0 && <EmptyState />}
        {items.map((item) => (
          <div key={item.label} className="rounded-[14px] bg-paper p-3">
            <div className="mb-2 flex items-center justify-between gap-3 text-[13px]">
              <span className="min-w-0 truncate font-black text-ink">{item.label}</span>
              <span className="shrink-0 rounded-full bg-mintsoft px-2.5 py-1 text-[12px] font-black text-forest">
                {item.value}{suffix}
              </span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-ink/8">
              <div
                className="h-full rounded-full bg-forest"
                style={{ width: `${Math.max(8, (item.value / max) * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function HourActivityChart({ items = [] }) {
  const values = items.map((item) => item.value || 0)
  const max = Math.max(1, ...values)
  const peak = items.reduce((best, item) => ((item.value || 0) > (best?.value || 0) ? item : best), null)

  return (
    <section className="rounded-[18px] border border-linen bg-card p-5 shadow-card lg:col-span-2">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.16em] text-forest">Actividad por hora</p>
          <h3 className="mt-1 font-playfair text-2xl font-bold text-ink">Horas con más movimiento</h3>
        </div>
        <div className="rounded-[14px] bg-mintsoft px-4 py-2">
          <p className="text-[11px] font-black uppercase tracking-[0.12em] text-muted">Hora líder</p>
          <p className="text-[18px] font-black text-ink">{peak?.label || 'Sin datos'} · {peak?.value || 0}</p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="mt-4"><EmptyState /></div>
      ) : (
        <div className="mt-6">
          <div className="flex h-56 items-end gap-2 rounded-[18px] bg-paper px-3 pb-4 pt-6 sm:gap-3 sm:px-5">
            {items.map((item) => {
              const height = Math.max(12, ((item.value || 0) / max) * 100)
              return (
                <div key={item.label} className="flex min-w-[34px] flex-1 flex-col items-center justify-end gap-2">
                  <span className="text-[11px] font-black text-forest">{item.value}</span>
                  <div className="flex h-36 w-full items-end">
                    <div
                      className="w-full rounded-t-[10px] bg-forest shadow-nav"
                      style={{ height: `${height}%` }}
                      aria-label={`${item.label}: ${item.value} eventos`}
                    />
                  </div>
                  <span className="text-[11px] font-bold text-muted">{item.label}</span>
                </div>
              )
            })}
          </div>
          <p className="mt-3 text-[12.5px] font-bold leading-relaxed text-muted">
            Úsalo para programar banners, happy hour y refuerzos de atención en los horarios donde el QR se mueve más.
          </p>
        </div>
      )}
    </section>
  )
}

function BranchActivityPanel({ items = [] }) {
  const total = items.reduce((sum, item) => sum + (item.value || 0), 0)
  const max = Math.max(1, ...items.map((item) => item.value || 0))

  return (
    <section className="rounded-[18px] border border-linen bg-card p-5 shadow-card">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.16em] text-forest">Multi-sucursal</p>
          <h3 className="mt-1 font-playfair text-2xl font-bold text-ink">Actividad por sucursal</h3>
        </div>
        <p className="rounded-full bg-ink px-3 py-1.5 text-[12px] font-black text-mint">{total} eventos</p>
      </div>

      <div className="mt-4 grid gap-3">
        {items.length === 0 && <EmptyState />}
        {items.map((item) => {
          const percent = total ? Math.round(((item.value || 0) / total) * 100) : 0
          return (
            <article key={item.label} className="rounded-[16px] border border-linen bg-paper p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <h4 className="truncate text-[15px] font-black text-ink">{item.label}</h4>
                  <p className="mt-1 text-[12px] font-bold text-muted">{percent}% del movimiento filtrado</p>
                </div>
                <p className="shrink-0 font-playfair text-3xl font-bold text-ink">{item.value}</p>
              </div>
              <div className="mt-3 h-3 overflow-hidden rounded-full bg-ink/8">
                <div
                  className="h-full rounded-full bg-gold"
                  style={{ width: `${Math.max(8, ((item.value || 0) / max) * 100)}%` }}
                />
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default function MetricsDashboard({ analytics }) {
  const summary = analytics?.summary || {}

  return (
    <div className="grid gap-4">
      <section className="rounded-[18px] border border-linen bg-ink p-5 text-white shadow-card">
        <p className="text-[11px] font-black uppercase tracking-[0.18em] text-mint">
          Analítica real
        </p>
        <h2 className="mt-1 font-playfair text-3xl font-bold">Métricas del ecosistema</h2>
        <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-white/65">
          Los datos vienen de eventos registrados por QR, vistas de productos, clics, reservas, pedidos y newsletter.
        </p>
      </section>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Escaneos hoy" value={summary.scansToday ?? 0} sub="Con deduplicación por sesión" />
        <StatCard label="Escaneos período" value={summary.scansPeriod ?? 0} sub="Según filtro activo" />
        <StatCard label="Sesiones únicas" value={summary.uniqueSessions ?? 0} sub="Usuarios aproximados" />
        <StatCard label="Conversión" value={`${summary.conversionRate ?? 0}%`} sub="Clicks, reservas, pedidos o suscripción" />
        <StatCard label="Producto más visto" value={summary.topProduct || 'Sin datos'} />
        <StatCard label="Categoría principal" value={summary.topCategory || 'Sin datos'} />
        <StatCard label="Fuente principal" value={summary.topSource || 'Sin datos'} />
        <StatCard label="Promoción líder" value={summary.topPromotion || 'Sin datos'} />
      </div>

      <div className="grid gap-4 xl:grid-cols-4">
        <BarList title="Dispositivos" items={analytics?.devices || []} />
        <BarList title="Origen del QR" items={analytics?.locations || []} />
        <HourActivityChart items={analytics?.hours || []} />
      </div>
      <BranchActivityPanel items={analytics?.branchActivity || []} />
    </div>
  )
}
