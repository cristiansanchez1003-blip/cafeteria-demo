'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { localizedField } from '@/lib/i18n'
import { useApp } from '@/contexts/AppContext'

export default function Hero({ settings, productCount = 0, promotionCount = 0 }) {
  const { scrollY } = useScroll()
  const { lang } = useApp()
  const y = useTransform(scrollY, [0, 360], [0, 46])
  const opacity = useTransform(scrollY, [0, 320], [1, 0.32])

  const slogan = settings ? localizedField(settings, 'slogan', lang) : ''
  const hours = settings ? localizedField(settings, 'hours', lang) : ''
  const brandName = settings?.name || 'Alma Café'
  const heroImage = settings?.heroImage || '/images/branding/hero/alma-cafe-hero-main.webp'
  const heroAlt = settings?.heroImageAlt || 'Interior de Alma Café con café de especialidad y brunch.'
  const logoUrl = settings?.logoUrl || settings?.theme?.logoUrl || '/images/branding/logo/alma-cafe-logo.png'

  return (
    <header className="relative min-h-[500px] overflow-hidden bg-ink text-white sm:min-h-[560px] lg:min-h-[640px]">
      <Image
        src={heroImage}
        alt={heroAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[52%_50%]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(38,33,29,0.76)_0%,rgba(38,33,29,0.46)_38%,rgba(38,33,29,0.18)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/18 to-transparent" />

      <motion.div
        style={{ y, opacity }}
        className="relative mx-auto flex min-h-[500px] max-w-6xl flex-col justify-end px-5 pb-8 pt-7 sm:min-h-[560px] sm:px-8 lg:min-h-[640px] lg:px-10"
      >
        <div className="mb-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-white/25 bg-white shadow-sm">
              <Image
                src={logoUrl}
                alt={`${brandName} logo`}
                fill
                sizes="56px"
                className="object-contain p-1.5"
              />
            </span>
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-mint">
                Demo gastronómica
              </p>
              <p className="font-lato text-[14px] font-bold text-white/86">
                {settings?.city || 'Menú digital'}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="font-playfair text-[44px] font-bold leading-[0.94] text-white sm:text-[68px] lg:text-[86px]"
          >
            {brandName}
          </motion.h1>

          {slogan && (
            <motion.p
              className="mt-5 max-w-2xl text-[16px] leading-relaxed text-white/82 sm:text-[19px]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.55 }}
            >
              {slogan}
            </motion.p>
          )}

          <motion.div
            className="mt-6 flex flex-wrap items-center gap-2.5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.55 }}
          >
            <a
              href="#carta"
              className="inline-flex rounded-full bg-mint px-5 py-3 text-[13px] font-black text-ink shadow-nav transition active:scale-95"
            >
              Ver nuestra carta
            </a>
            <a
              href="#reservas"
              className="inline-flex rounded-full border border-white/18 bg-white/12 px-5 py-3 text-[13px] font-black text-white backdrop-blur transition active:scale-95"
            >
              Reservar una mesa
            </a>
            {hours && (
              <span className="inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/12 px-4 py-2 text-[13px] font-bold text-white backdrop-blur">
                <svg className="h-4 w-4 text-mint" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
                {hours}
              </span>
            )}
            <span className="inline-flex rounded-full border border-white/16 bg-white/12 px-4 py-2 text-[13px] font-bold text-white backdrop-blur">
              {productCount} productos
            </span>
            <span className="inline-flex rounded-full border border-white/16 bg-white/12 px-4 py-2 text-[13px] font-bold text-white backdrop-blur">
              {promotionCount} campañas activas
            </span>
          </motion.div>
        </div>
      </motion.div>
    </header>
  )
}
