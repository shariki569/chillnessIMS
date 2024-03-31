// tailwind.config.js

module.exports = {
  content: [
    "./components/**/*.{js,jsx,ts,tsx}",
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./navigation/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#88cd46",
        "primary-content": "#0a1004",
        "primary-dark": "#6fb030",
        "primary-light": "#a2d86e",

        secondary: "#46cbcd",
        "secondary-content": "#041010",
        "secondary-dark": "#30aeb0",
        "secondary-light": "#6ed6d8",

        background: "#f0f1ef",
        foreground: "#fbfbfb",
        border: "#dfe2dd",

        copy: "#262923",
        "copy-light": "#666e5e",
        "copy-lighter": "#8c9584",

        success: "#46cd46",
        warning: "#cdcd46",
        error: "#cd4646",

        "success-content": "#041004",
        "warning-content": "#101004",
        "error-content": "#ffffff",
      },
    },
  },
  plugins: [],
};
