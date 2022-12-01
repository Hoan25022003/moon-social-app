module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  important: "#root",
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
        darkLite: "#13131A",
        darkSecondary: "#1C1C24",
        darkSoft: "#22222C",
        darkSoft2: "#24242C",
        darkStroke: "#3A3A43",
        darkRed: "#422C32",
        iconColor: "#A2A2A8",
        whiteSoft: "#EFF1F1",
        whiteSoft2: "#EFF3F4",
        graySoft: "#E7E7E8",
        strock: "#ddd",
        lite: "#f9f9f9",
        text1: "#171725",
        text2: "#4B5264",
        text3: "#808191",
        text4: "#B2B3BD",
        errorColor: "#EB5757",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
