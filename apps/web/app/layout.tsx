import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import { WsClientProvider } from "@repo/ws-client";
import "./global.scss";

const ENV = {
  API_HOST: "http://localhost:3001",
};

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
    <WsClientProvider uri={ENV.API_HOST}>
      <html lang="en">
        <body className={pressStart2P.className}>{children}</body>
      </html>
    </WsClientProvider>
  );
}
