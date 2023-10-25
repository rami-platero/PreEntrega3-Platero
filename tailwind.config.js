/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/**/*.{html,js}"],
  theme: {
    extend: {
      maxWidth: {
        'thumbnail': '128px',
      }
    }
  },
  plugins: [],
}

