'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function BrandStory({ settings }) {
  if (!settings?.interiorImage && !settings?.storefrontImage && !settings?.storyText) return null

  const brandName = settings.name || 'Alma Café'

  return (
    <section className="mx-auto max-w-6xl px-4 pb-7 pt-5 sm:px-6 lg:pb-10 lg:pt-8">
      <div className="grid gap-4 lg:grid-cols-[1fr_0.78fr]">
        <motion.article
          className="relative min-h-[320px] overflow-hidden rounded-[22px] bg-ink shadow-cardHover"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          {settings.interiorImage && (
            <Image
              src={settings.interiorImage}
              alt={settings.interiorImageAlt || `Interior de ${brandName}`}
              fill
              sizes="(max-width: 1024px) 100vw, 650px"
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/64 via-ink/10 to-transparent" />
          <div className="image-glass-panel absolute inset-x-4 bottom-4 rounded-[20px] p-4 text-white sm:inset-x-6 sm:bottom-6 sm:p-5">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-mint">
              Conoce {brandName}
            </p>
            <h2 className="mt-2 max-w-xl font-playfair text-[29px] font-bold leading-tight sm:text-[38px]">
              {settings.storyTitle || 'Una experiencia de café con calma'}
            </h2>
            {settings.storyText && (
              <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-white/88">
                {settings.storyText}
              </p>
            )}
          </div>
        </motion.article>

        <motion.article
          className="overflow-hidden rounded-[22px] border border-linen bg-card shadow-card dark:border-linendark dark:bg-carddark"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08, duration: 0.45 }}
        >
          {settings.storefrontImage && (
            <div className="relative aspect-[4/3]">
              <Image
                src={settings.storefrontImage}
                alt={settings.storefrontImageAlt || `Fachada de ${brandName}`}
                fill
                sizes="(max-width: 1024px) 100vw, 430px"
                className="object-cover"
              />
            </div>
          )}
          <div className="p-5">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-forest dark:text-mint">
              Ubicación
            </p>
            <h3 className="mt-1 font-playfair text-[25px] font-bold text-ink dark:text-paper">
              {settings.address || 'Sucursal principal'}
            </h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-muted dark:text-muteddark">
              Un espacio diseñado para brunch, café de especialidad y encuentros tranquilos durante todo el día.
            </p>
          </div>
        </motion.article>
      </div>
    </section>
  )
}
