'use client'

import { useEffect, useState } from 'react'

const PREFERENCES = [
  ['menu-dia', 'Menu del dia'],
  ['promociones', 'Promociones'],
  ['eventos', 'Eventos'],
  ['nuevos-productos', 'Nuevos productos'],
  ['temporada', 'Cafe de temporada'],
]

export default function NewsletterSection({ settings, branchId, qrSourceId }) {
  const [form, setForm] = useState({ email: '', name: '', consent: false, preferences: ['promociones'] })
  const [status, setStatus] = useState(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (window.sessionStorage.getItem('alma-newsletter-dismissed') === 'true') return
    const timer = window.setTimeout(() => setOpen(true), 15000)
    return () => window.clearTimeout(timer)
  }, [])

  function set(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function togglePreference(id) {
    setForm((current) => ({
      ...current,
      preferences: current.preferences.includes(id)
        ? current.preferences.filter((item) => item !== id)
        : [...current.preferences, id],
    }))
  }

  function closeModal() {
    window.sessionStorage.setItem('alma-newsletter-dismissed', 'true')
    setOpen(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus({ type: 'loading', message: 'Guardando...' })
    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        branch_id: branchId,
        qr_source_id: qrSourceId,
        source: qrSourceId ? 'qr' : 'menu',
      }),
    })
    const data = await res.json()
    if (!res.ok) {
      setStatus({ type: 'error', message: data.error || 'No se pudo guardar' })
      return
    }
    setForm({ email: '', name: '', consent: false, preferences: ['promociones'] })
    setStatus({
      type: 'success',
      message: data.duplicate ? 'Actualizamos tu suscripcion.' : 'Listo. Te enviaremos novedades relevantes.',
    })
    window.sessionStorage.setItem('alma-newsletter-dismissed', 'true')
    window.setTimeout(() => setOpen(false), 1200)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/48 px-4 pb-4 backdrop-blur-sm sm:items-center sm:pb-0">
      <div className="w-full max-w-2xl rounded-[24px] border border-linen bg-card p-5 shadow-cardHover dark:border-linendark dark:bg-carddark sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-forest dark:text-mint">
              Comunidad
            </p>
            <h2 className="mt-2 font-playfair text-[28px] font-bold leading-tight text-ink dark:text-paper">
              {settings?.newsletterTitle || 'Recibe nuestras novedades'}
            </h2>
            <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-muted dark:text-muteddark">
              {settings?.newsletterText || 'Enterate del menu del dia, eventos y promociones especiales.'}
            </p>
          </div>
          <button
            type="button"
            onClick={closeModal}
            aria-label="Cerrar newsletter"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink/8 text-xl font-bold text-ink/60 transition active:scale-95 dark:bg-paper/10 dark:text-paper/70"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
              placeholder="Correo electronico"
              className="rounded-xl border border-linen bg-paper px-4 py-3 text-[14px] outline-none focus:border-forest focus:ring-2 focus:ring-mint dark:border-linendark dark:bg-paperdark"
            />
            <input
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              placeholder="Nombre opcional"
              className="rounded-xl border border-linen bg-paper px-4 py-3 text-[14px] outline-none focus:border-forest focus:ring-2 focus:ring-mint dark:border-linendark dark:bg-paperdark"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {PREFERENCES.map(([id, label]) => {
              const active = form.preferences.includes(id)
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => togglePreference(id)}
                  className={`rounded-full px-3 py-1.5 text-[11.5px] font-black ${
                    active ? 'bg-ink text-mint dark:bg-mint dark:text-ink' : 'border border-linen text-muted dark:border-linendark'
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>

          <label className="flex items-start gap-2 text-[12px] leading-relaxed text-muted dark:text-muteddark">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(e) => set('consent', e.target.checked)}
              className="mt-1"
            />
            Acepto recibir comunicaciones de este local. Puedo pedir la baja cuando quiera.
          </label>

          <button className="rounded-xl bg-forest px-5 py-3 text-[14px] font-black text-white">
            Suscribirme
          </button>
          {status && (
            <p className={`text-[12.5px] font-bold ${status.type === 'error' ? 'text-red-600' : 'text-forest dark:text-mint'}`}>
              {status.message}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
