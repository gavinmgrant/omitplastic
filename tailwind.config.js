const plugin = require("tailwindcss/plugin");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Heebo", "ui-sans-serif"],
      serif: ["DM Serif Text", "ui-serif"],
      mono: ["SFMono-Regular", "ui-monospace"],
      display: ["Oswald"],
      body: ["Open Sans"],
    },
    minWidth: {
      0: "0",
      "1/4": "25%",
      "1/3": "33.33333%",
      "1/2": "50%",
      "3/4": "75%",
      1: "100%",
    },
    maxWidth: {
      "1/4": "25%",
      "1/3": "33.33333%",
      "1/2": "50%",
      "3/4": "75%",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
