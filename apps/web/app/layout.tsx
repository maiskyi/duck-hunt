import { Press_Start_2P } from "next/font/google";

import "./global.scss";

import type { Metadata } from "next";

const pressStart2P = Press_Start_2P({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Duck Hunt",
  description: "Duck Hunt Game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={pressStart2P.className}>{children}</body>
    </html>
  );
}
