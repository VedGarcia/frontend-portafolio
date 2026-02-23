import Navbar from "@/components/Navbar";
import FloatingHexagons from "@/components/FloatingHexagons";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { getGlobal } from "@/lib/api";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "El Blog de VEd",
  description: "Portafolio de Victor Garcia",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await getGlobal('profile');

  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-linear-to-br from-purple-600 to-purple-900 text-white antialiased`}
      >
        <FloatingHexagons />
        <Navbar socialLinks={profile.socialLinks} />
        <div className="container mx-auto">
          {children}
        </div>
      </body>
    </html>
  );
}
