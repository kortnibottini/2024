import type { Metadata } from "next";
import { oaks, tan } from "./font";
import "./globals.css";
import cx from "classnames";

export const metadata: Metadata = {
  title: "Kortni Bottini | Design Director",
  description: "Portfolio of Kortni Bottini, Design Director",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cx(oaks.className, oaks.variable, tan.variable)}>
      <body>{children}</body>
    </html>
  );
}
