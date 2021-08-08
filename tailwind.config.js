const plugin = require("tailwindcss/plugin");

module.exports = {
  purge: false,
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
    extend: {
      colors: {
        "custom-green": "#5f7552",
      },
      zIndex: {
        "-10": "-10",
        "-20": "-20"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(({ addBase, theme }) => {
      addBase({
        h1: {
          fontSize: theme("fontSize.2xl"),
          fontFamily: theme("fontFamily.serif"),
          lineHeight: theme("lineHeight.loose"),
        },
        h2: {
          fontSize: theme("fontSize.xl"),
          fontFamily: theme("fontFamily.serif"),
          lineHeight: theme("lineHeight.loose"),
        },
        h3: {
          fontSize: theme("fontSize.lg"),
          fontFamily: theme("fontFamily.serif"),
          lineHeight: theme("lineHeight.loose"),
        },
        a: {
          color: theme("colors.custom-green"),
        },
      });
    }),
  ],
};
