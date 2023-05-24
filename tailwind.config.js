/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        'gray-300': '#a3a3a3',
        'gray-400': '#858585',
        'primary-400': '#35596c',
        'primary-500': '#0f2936',
        'primary-600': '#091d2b',
        'primary-700': '#051926',
        'primary-800': '#060f14',
        'secondary-300': '#7ac5d7',
        'secondary-500': '#219ebc',
        'secondary-800': '#00b5e0',
        'tertiary-50': '#fff8e6',
        'tertiary-100': '#fff1cd',
        'quaternary-500': '#fb8500',
      },
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    // require('@tailwindcss/forms')({
    //   strategy: 'class'
    // })
  ],
};
