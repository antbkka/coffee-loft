/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Loft palette
        loft: {
          black: '#0d0d0d',
          dark: '#1a1a1a',
          steel: '#2a2a2a',
          gray: '#3a3a3a',
          smoke: '#8a8a8a',
          concrete: '#c9c5bd',
          brick: '#8b3a2e',
          copper: '#b87333',
          amber: '#e89a4a',
          rust: '#c45a2d',
        }
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'brick': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%23221a17'/%3E%3Cpath d='M0 20h80M0 40h80M0 60h80M20 0v20M40 0v20M60 0v20M0 20v20M20 20v20M40 20v20M60 20v20M20 40v20M40 40v20M60 40v20' stroke='%23352320' stroke-width='1'/%3E%3C/svg%3E\")",
        'concrete': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.85' numOctaves='2' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.18'/%3E%3C/svg%3E\")",
        'metal': "linear-gradient(135deg, %233a3a3a 0%25, %231a1a1a 50%25, %233a3a3a 100%25)",
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'glow': 'glow 2.5s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(184,115,51,0.4)' },
          '50%': { boxShadow: '0 0 35px rgba(232,154,74,0.7)' },
        }
      }
    },
  },
  plugins: [],
}