/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        primary: {
          violet: "#5964E0",
          "light-violet": "#939BF4",
          "very-dark-blue": "#19202D",
          midnight: "#121721",
        },
        secondary: {
          white: "#FFFFFF",
          "light-gray": "#F4F6F8",
          gray: "#9DAEC2",
          "dark-gray": "#6E8098",
        },
        "modal-bg": "var(--modal-bg)",
      },
      borderRadius: {
        "5px": "5px",
      },
      backgroundImage: {
        "header-desktop": "url('/assets/desktop/bg-pattern-header.svg')",
        "header-tablet": "url('/assets/tablet/bg-pattern-header.svg')",
        "header-mobile": "url('/assets/mobile/bg-pattern-header.svg')",
      },
    },
  },
  plugins: [],
};
