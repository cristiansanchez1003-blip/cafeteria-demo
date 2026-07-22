import { Playfair_Display, Lato } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-lato',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Alma Café | Café de especialidad, brunch y pastelería',
  description:
    'Descubre Alma Café: café de especialidad, brunch, pastelería artesanal y una experiencia cálida y contemporánea.',
  openGraph: {
    title: 'Alma Café',
    description: 'Café de especialidad, brunch y pastelería artesanal en una carta digital premium.',
    type: 'website',
    images: ['/images/branding/hero/alma-cafe-hero-main.webp'],
  },
}

export const viewport = {
  themeColor: '#26211D',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${playfair.variable} ${lato.variable}`}>
      <body className="min-h-screen bg-paper font-lato text-ink">{children}</body>
    </html>
  )
}
