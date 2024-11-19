import localFont from "next/font/local";
export const oaks = localFont({
  variable: "--font-oaks",
  src: [
    {
      path: "./fonts/OakesGroteskRegular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/OakesGroteskLight.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/OakesGroteskLightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/OakesGroteskMedium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/OakesGroteskBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
});

export const tan = localFont({
  variable: "--font-tan",
  src: "./fonts/TAN-AESOP.woff2",
});
