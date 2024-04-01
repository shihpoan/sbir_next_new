/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary_200: "#C7EFF1",
        primary_500: "#23B4C8",
        primary_900: "#125C66",
        primary_content_bg_100: "#EAF2F6",
        primary_content_bg_400: "#A1CCDB",
        subcolor_2_500: "#FFE65F",
        content_bg_0: "#FFFFFF",
        content_bg_100: "#F7F7F7",
        content_bg_200: "#DBDBDB",
        text_color_100: "#AEB6BF",
        text_color_300: "#657280",
        text_color_500: "#343A40",
        text_color_800: "#111111",
      },
      backgroundImage: {
        home_grid_bg: "url('/bg-grid.svg')",
        subcolor_500: "linear-gradient(90deg, #64F5D2 0%, #557DFF 100%)",
        subcolor_800: "linear-gradient(90deg, #00BAD2 0%, #557EFF 100%)",
      },
    },
  },
  plugins: [],
};
