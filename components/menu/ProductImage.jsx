'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function ProductImage({ src, alt, emoji, className = '' }) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-mintsoft to-mint/60 dark:from-carddark dark:to-forest/30 ${className}`}
        aria-hidden="true"
      >
        <span className="select-none text-3xl drop-shadow-sm">{emoji || '☕'}</span>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 38vw, (max-width: 1280px) 260px, 320px"
        className="object-cover"
        onError={() => setFailed(true)}
      />
    </div>
  )
}
