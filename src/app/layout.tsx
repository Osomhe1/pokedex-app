import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PokéDex App",
  description: "A comprehensive PokéDex application built with Next.js and PokeAPI",
  icons: {
    icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-100 min-h-screen`}
      >
        <Providers>
          <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60">
            <div className="container mx-auto flex h-16 items-center px-4">
              <a href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-white hover:text-red-400 transition-colors">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" alt="Pokeball" className="w-8 h-8" />
                PokéDex
              </a>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8 relative">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
