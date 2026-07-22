'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function PromoBanner({ promotion }) {
  if (!promotion?.active) return null

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="group relative h-[210px] min-w-[86%] overflow-hidden rounded-[22px] bg-ink shadow-cardHover sm:h-[260px] sm:min-w-[420px] lg:min-w-0"
    >
      {promotion.image && (
        <Image
          src={promotion.image}
          alt={promotion.imageAlt || promotion.title || 'Promoción de Alma Café'}
          fill
          sizes="(max-width: 1024px) 86vw, 360px"
          className="object-cover opacity-80 transition duration-500 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/16 to-transparent" />
      <div className="image-glass-panel absolute inset-x-3 bottom-3 rounded-[18px] p-4 text-white sm:p-5">
        {promotion.badge && (
          <span className="inline-flex rounded-full bg-white/18 px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] backdrop-blur">
            {promotion.badge}
          </span>
        )}
        <h3 className="mt-3 font-playfair text-[25px] font-bold leading-none sm:text-[30px]">
          {promotion.title}
        </h3>
        {promotion.subtitle && (
          <p className="mt-2 max-w-sm text-[13.5px] leading-relaxed text-white/88 sm:text-[14px]">
            {promotion.subtitle}
          </p>
        )}
        {promotion.cta && (
          <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-mint px-4 py-2 text-[12.5px] font-black text-ink">
            {promotion.cta}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </span>
        )}
      </div>
    </motion.article>
  )
}
