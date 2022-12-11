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
      colors: {
        // Arc Colors: https://arc.net/colors.html (only in Arc Browser: https://arc.net)
        arcPaletteBackgroundDark: "var(--arc-palette-backgroundExtra)",
        arcPaletteBackground: "var(--arc-palette-background)",
        arcPaleteForegroundPrimary: "var(--arc-palette-foregroundPrimary)",
        arcPaleteForegroundSecondary: "var(--arc-palette-foregroundSecondary)",
        arcPaleteForegroundTertiary: "var(--arc-palette-foregroundTertiary)",
        arcPaletteMaxContrastColor: "var(--arc-palette-maxContrastColor)",
        arcPaletteFocus: "var(--arc-palette-focus)",
        arcPaletteHover: "var(--arc-palette-hover)",
        arcPaletteCutoutColor: "var(--arc-palette-cutoutColor)",
        arcPaletteTitle: "var(--arc-palette-title)",
        arcPaletteSubtitle: "var(--arc-palette-subtitle)",
        arcBackgroundSimpleColor: "var(--arc-background-simple-color)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwind-animation-delay"),
  ],
};
