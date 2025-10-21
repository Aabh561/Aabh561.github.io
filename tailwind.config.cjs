export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#0f62fe',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial'],
        serif: ['Spectral', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
