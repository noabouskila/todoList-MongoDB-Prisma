import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Background from "./ui/Background";
import Logo from "@/app/ui/Logo";
import NavLinks from "./ui/NavLinks";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My todo next js",
  description: "Appli codée dans la formation Next.js par DonkeyGeek",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header>
          <Logo/>
          <NavLinks/>
        </header>
        <main>
          {children}
          <Background/>
        </main>

        <footer>&copy: Noa</footer>
        
      </body>
    </html>
  );
}
