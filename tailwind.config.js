/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#2C4A3E',
          dark: '#3A5F51',
        },
        gold: '#B8975A',
        cream: '#F7F4EF',
        ink: '#1A1A1A',
        mid: '#555555',
        muted: '#AAAAAA',
        edge: '#D5CFC4',
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display: ['2rem', { lineHeight: '1.15' }],
        section: ['1.375rem', { lineHeight: '1.3' }],
        body: ['0.9375rem', { lineHeight: '1.6' }],
        label: ['0.8125rem', { lineHeight: '1.4' }],
      },
      borderRadius: {
        card: '12px',
        input: '8px',
      },
      boxShadow: {
        card: '0 2px 12px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 20px rgba(0,0,0,0.10)',
      },
      maxWidth: {
        form: '640px',
        dashboard: '960px',
      },
    },
  },
  plugins: [],
}
