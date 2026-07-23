'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function AdminHeader({ dirty, saving, onSave, role, roleOptions = [], onRoleChange }) {
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.replace('/admin/login')
  }

  return (
    <header className="sticky top-0 z-40 border-b border-linen bg-paper/95 backdrop-blur-xl">
      <div className="mx-auto flex min-w-0 max-w-7xl items-center gap-2 px-3 py-3 sm:gap-3 sm:px-6">
        <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[14px] border border-linen bg-white shadow-card sm:h-12 sm:w-12 sm:rounded-[16px]">
          <Image
            src="/images/branding/logo/alma-cafe-logo-light.webp"
            alt="Alma Café logo"
            fill
            sizes="48px"
            className="object-cover"
          />
        </span>
        <div className="min-w-0">
          <p className="truncate font-lato text-[14px] font-black leading-tight text-ink">Alma Café</p>
          <p className="hidden text-[12px] font-bold text-muted sm:block">Panel de administración</p>
        </div>

        <div className="ml-auto flex min-w-0 shrink-0 items-center gap-1.5 sm:gap-2">
          {roleOptions.length > 0 && (
            <label className="flex items-center gap-2 rounded-full border border-linen bg-card px-2.5 py-2 shadow-card sm:px-3">
              <span className="hidden text-[11px] font-black uppercase tracking-[0.14em] text-muted md:inline">Vista</span>
              <select
                value={role}
                onChange={(event) => onRoleChange?.(event.target.value)}
                className="max-w-[104px] bg-transparent text-[12px] font-black text-ink outline-none sm:max-w-[150px] sm:text-[13.5px]"
                aria-label="Cambiar rol demo"
              >
                {roleOptions.map((option) => (
                  <option key={option.id} value={option.id}>{option.label}</option>
                ))}
              </select>
            </label>
          )}
          {dirty && (
            <button
              onClick={onSave}
              disabled={saving}
              className="flex items-center gap-1.5 rounded-full bg-forest px-3 py-2 text-[12.5px] font-bold text-white shadow-nav transition active:scale-95 disabled:opacity-60 sm:px-4 sm:text-[13px]"
            >
              {saving ? (
                <>
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Guardando...
                </>
              ) : (
                <>
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z" />
                    <path d="M17 21v-8H7v8M7 3v5h8" />
                  </svg>
                  Guardar
                </>
              )}
            </button>
          )}
          <button
            onClick={handleLogout}
            className="rounded-full border border-linen bg-card px-3 py-2 text-[12.5px] font-bold text-ink/70 transition active:scale-95 sm:px-4 sm:text-[13px]"
          >
            Salir
          </button>
        </div>
      </div>
    </header>
  )
}
