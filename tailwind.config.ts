import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Spotify Brand Colors
        "spotify-black": "#121212",
        "spotify-dark": "#181818",
        "spotify-surface": "#1f1f1f",
        "spotify-green": "#1ed760",
        "spotify-green-alt": "#1db954",

        // Text Colors
        "text-base": "#ffffff",
        "text-secondary": "#b3b3b3",
        "text-tertiary": "#cbcbcb",
        "text-light": "#fdfdfd",

        // Semantic Colors
        "text-negative": "#f3727f",
        "text-warning": "#ffa42b",
        "text-announcement": "#539df5",

        // Surface & Border Colors
        "card-dark": "#252525",
        "card-mid": "#272727",
        "border-gray": "#4d4d4d",
        "border-light": "#7c7c7c",
        "separator": "#b3b3b3",
        "surface-light": "#eeeeee",
      },

      fontSize: {
        // Typography Scale (10px-24px range)
        "section-title": ["24px", { lineHeight: "normal", fontWeight: "700" }],
        "feature-heading": ["18px", { lineHeight: "1.30", fontWeight: "600" }],
        "body-bold": ["16px", { lineHeight: "normal", fontWeight: "700" }],
        body: ["16px", { lineHeight: "normal", fontWeight: "400" }],
        "button-upper": ["14px", { lineHeight: "1.00", fontWeight: "600" }],
        button: ["14px", { lineHeight: "normal", fontWeight: "700" }],
        "nav-link-bold": ["14px", { lineHeight: "normal", fontWeight: "700" }],
        "nav-link": ["14px", { lineHeight: "normal", fontWeight: "400" }],
        "caption-bold": ["14px", { lineHeight: "1.54", fontWeight: "700" }],
        caption: ["14px", { lineHeight: "normal", fontWeight: "400" }],
        "small-bold": ["12px", { lineHeight: "1.50", fontWeight: "700" }],
        small: ["12px", { lineHeight: "normal", fontWeight: "400" }],
        badge: ["10.5px", { lineHeight: "1.33", fontWeight: "600" }],
        micro: ["10px", { lineHeight: "normal", fontWeight: "400" }],
      },

      fontFamily: {
        spotify: [
          "SpotifyMixUI",
          "CircularSp-Arab",
          "CircularSp-Hebr",
          "CircularSp-Cyrl",
          "CircularSp-Grek",
          "CircularSp-Deva",
          "Helvetica Neue",
          "helvetica",
          "arial",
          "Hiragino Sans",
          "Hiragino Kaku Gothic ProN",
          "Meiryo",
          "MS Gothic",
          "sans-serif",
        ],
      },

      boxShadow: {
        // Spotify Shadow System
        "spotify-heavy": "rgba(0, 0, 0, 0.5) 0px 8px 24px",
        "spotify-medium": "rgba(0, 0, 0, 0.3) 0px 8px 8px",
        "spotify-inset": "rgb(18, 18, 18) 0px 1px 0px, rgb(124, 124, 124) 0px 0px 0px 1px inset",
      },

      borderRadius: {
        // Spotify Border Radius Scale
        "spotify-minimal": "2px",
        "spotify-subtle": "4px",
        "spotify-standard": "6px",
        "spotify-comfortable": "8px",
        "spotify-medium": "10px",
        "spotify-pill": "500px",
        "spotify-full-pill": "9999px",
        "spotify-circle": "50%",
      },

      spacing: {
        // 8px base unit system
        0.5: "1px",
        1: "2px",
        1.5: "3px",
        2: "4px",
        2.5: "5px",
        3: "6px",
        4: "8px",
        5: "10px",
        6: "12px",
        7: "14px",
        7.5: "15px",
        8: "16px",
        10: "20px",
      },

      letterSpacing: {
        "button-wide": "1.4px",
        "button-wider": "2px",
        "button-default": "0.14px",
      },

      textTransform: {
        uppercase: "uppercase",
        capitalize: "capitalize",
      },
    },
  },
  plugins: [],
} satisfies Config;
