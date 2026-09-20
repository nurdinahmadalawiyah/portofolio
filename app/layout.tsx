import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scrollToTop";
import SmoothScroll from "@/components/smoothScroll";
import clsx from "clsx";
import { Analytics } from "@vercel/analytics/react";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

import { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.home.description,
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="antialiased selection:bg-turquoise selection:text-black">
      <head />
      <body
        suppressHydrationWarning
        className={clsx(
          "min-h-screen bg-background font-sans antialiased overflow-x-hidden",
          plusJakartaSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "system", enableSystem: true, storageKey: "portofolio-theme" }}>
          
          <Navbar />
          <ScrollToTop />
          <SmoothScroll>
            <div className="relative z-10 flex flex-col min-h-screen bg-transparent">
              <main className="container mx-auto max-w-6xl pt-16 px-4 flex-grow">
                {children}
                <Analytics />
              </main>
              <Footer />
            </div>
          </SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}
