/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      animation: {
        fadeInDown: "fadeInDown 2s forwards",
        fadeIn: "fadeIn 2s forwards",
      },

      keyframes: {
        fadeInDown: {
          from: {
            opacity: 0,
            transform: "translateY(-50%)",
          },
          to: {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
        fadeIn: {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwind-animation-delay"),
  ],
};
