/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './hooks/**/*.{js,jsx}',
    './contexts/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#F5EFE6',
        card: '#FFFDF8',
        ink: '#26211D',
        muted: '#756C63',
        mint: '#D8D1BD',
        mintsoft: '#EEE7D8',
        forest: '#6F7653',
        linen: '#DED4C4',
        gold: '#A9855D',
        paperdark: '#191714',
        carddark: '#24201C',
        linendark: '#393229',
        muteddark: '#B6AB9C',
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'serif'],
        lato: ['var(--font-lato)', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 10px rgba(38, 33, 29, 0.06)',
        cardHover: '0 12px 28px rgba(38, 33, 29, 0.14)',
        nav: '0 6px 18px rgba(38, 33, 29, 0.08)',
        sheet: '0 -12px 40px rgba(38, 33, 29, 0.22)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
}
