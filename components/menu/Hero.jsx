'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { localizedField } from '@/lib/i18n'
import { useApp } from '@/contexts/AppContext'

export default function Hero({ settings, productCount = 0, promotionCount = 0 }) {
  const { scrollY } = useScroll()
  const { lang } = useApp()
  const y = useTransform(scrollY, [0, 260], [0, 22])
  const opacity = useTransform(scrollY, [0, 260], [1, 0.5])

  const slogan = settings ? localizedField(settings, 'slogan', lang) : ''
  const hours = settings ? localizedField(settings, 'hours', lang) : ''
  const brandName = settings?.name || 'Alma Café'
  const heroImage = settings?.heroImage || '/images/branding/hero/alma-cafe-hero-main.webp'
  const heroAlt = settings?.heroImageAlt || 'Interior de Alma Café con café de especialidad y brunch.'
  const logoUrl = settings?.logoUrl || settings?.theme?.logoUrl || '/images/branding/logo/alma-cafe-logo.png'

  return (
    <header className="relative h-[52svh] min-h-[350px] max-h-[500px] overflow-hidden bg-ink text-white sm:h-[50vh] sm:min-h-[380px] lg:max-h-[540px]">
      <Image
        src={heroImage}
        alt={heroAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[52%_50%]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(38,33,29,0.66)_0%,rgba(38,33,29,0.34)_46%,rgba(38,33,29,0.12)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/12 to-transparent" />

      <motion.div
        style={{ y, opacity }}
        className="relative mx-auto flex h-full max-w-6xl flex-col justify-end px-4 pb-4 pt-4 sm:px-6 sm:pb-6 lg:px-8"
      >
        <div className="mb-auto flex items-center justify-between gap-4">
          <div className="image-glass-chip flex items-center gap-3 rounded-2xl px-3 py-2">
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
              <p className="text-[10.5px] font-black uppercase tracking-[0.18em] text-mint">
                Demo gastronómica
              </p>
              <p className="font-lato text-[13.5px] font-bold text-white">
                {settings?.city || 'Menú digital'}
              </p>
            </div>
          </div>
        </div>

        <div className="image-glass-panel max-w-2xl rounded-[24px] p-4 sm:p-5">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="font-playfair text-[38px] font-bold leading-[0.94] text-white sm:text-[56px] lg:text-[68px]"
          >
            {brandName}
          </motion.h1>

          {slogan && (
            <motion.p
              className="mt-3 max-w-xl text-[14.5px] leading-relaxed text-white/90 sm:text-[17px]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.55 }}
            >
              {slogan}
            </motion.p>
          )}

          <motion.div
            className="mt-4 flex flex-wrap items-center gap-2"
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
              className="inline-flex rounded-full border border-white/20 bg-white/16 px-4 py-2.5 text-[12.5px] font-black text-white backdrop-blur transition active:scale-95"
            >
              Reservar una mesa
            </a>
            {hours && (
              <span className="inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/12 px-3.5 py-2 text-[12.5px] font-bold text-white backdrop-blur">
                <svg className="h-4 w-4 text-mint" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
                {hours}
              </span>
            )}
            <span className="inline-flex rounded-full border border-white/16 bg-white/12 px-3.5 py-2 text-[12.5px] font-bold text-white backdrop-blur">
              {productCount} productos
            </span>
            <span className="inline-flex rounded-full border border-white/16 bg-white/12 px-3.5 py-2 text-[12.5px] font-bold text-white backdrop-blur">
              {promotionCount} campañas activas
            </span>
          </motion.div>
        </div>
      </motion.div>
    </header>
  )
}
