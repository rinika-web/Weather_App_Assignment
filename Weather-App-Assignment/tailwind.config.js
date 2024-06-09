/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",

  ],
  theme: {
    screens : {
      'sm': '576px',
      
      'md': '960px',
    
      'lg': '1440px',
     
    }
  },
  plugins: [],
}

