module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      rotate: {
        '15': '15deg'
      },
      colors: {
        OceanicaDark: "#164E63",
        ColorhubBrand: "#3B82F6",
        LightBlue: "#8EDAF9",
        BlueGrey: "#D5F0FC",
        Light: "#FFFFFF",
        BlueBrothersDark: "#1E3A8A",
        PinkPillowsBrand: "#EC4899",
        ElectricBluesBrand: "#0EA5E9",
        Orange: "#F97316",
      },
      fontFamily: {
        Balsamiq: ["Balsamiq Sans", "cursive"],
        Fuzzy: ['Fuzzy Bubbles', 'cursive'],
        Bakbak: ['Bakbak One', 'cursive'],
        Oswald: ['Oswald', 'sans-serif'],
        PTsans: ['PT Sans', 'sans-serif'],
        Lato: ['Lato', 'sans-serif'],
        Ubuntu: ['Ubuntu', 'sans-serif'],
        Vietnam: ['Bo Vietnam Pro', 'sans-serif'],
        PermanentMarker: ['Permanent marker', 'cursive'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
