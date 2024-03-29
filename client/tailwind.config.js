module.exports = {
  important: true,
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Poppins", "sans-serif;"],
      },
      colors: {
        primary: "#0072ff",
        secondary: "#fc00ff",
        thirdColor: "#00dbde",
        heartColor: "#F91880",
        darkLite: "#15202B",
        darkSecondary: "#1C1C24",
        darkSoft: "#2C3640",
        darkSoft2: "#273340",
        darkRed: "#422C32",
        iconColor: "#A2A2A8",
        whiteSoft: "#EFF1F1",
        whiteSoft2: "#EFF3F4",
        graySoft: "#E7E7E8",
        strock: "#ddd",
        darkStroke: "#2C3640",
        lite: "#f9f9f9",
        text1: "#171725",
        text2: "#4B5264",
        text3: "#808191",
        text4: "#B2B3BD",
        errorColor: "#EB5757",
        successColor: "#4AC860",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
