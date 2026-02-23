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

import { ThemeProvider } from "@/components/ThemeProvider";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await getGlobal('profile');

  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen transition-colors duration-500
          bg-white text-purple-950 
          dark:bg-linear-to-br dark:from-purple-950 dark:via-black dark:to-purple-900 dark:text-purple-200`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          <FloatingHexagons />
          <Navbar socialLinks={profile.socialLinks} />
          <div className="container mx-auto">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
