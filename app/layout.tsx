import "@/styles/globals.css";
import { Metadata } from "next";
import { getYearsOfExperience, siteConfig } from "@/config/site";
import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { formatMessage } from "@/i18n/format";
import { LocaleProvider } from "@/i18n/context";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import SmoothScroll from "@/components/smoothScroll";
import clsx from "clsx";
import { Analytics } from "@vercel/analytics/react";
import { Plus_Jakarta_Sans } from "next/font/google";
import ChatWidget from "@/components/ChatWidget";

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

const dictionary = getDictionary(defaultLocale);

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: formatMessage(defaultLocale, dictionary.meta.description, {
    years: getYearsOfExperience(),
  }),
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
    <html lang={defaultLocale} suppressHydrationWarning className="antialiased selection:bg-turquoise selection:text-black">
      <head />
      <body
        suppressHydrationWarning
        className={clsx(
          "min-h-screen bg-background text-foreground font-sans antialiased overflow-x-hidden",
          plusJakartaSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "system", enableSystem: true, storageKey: "portofolio-theme" }}>
          <LocaleProvider>
            <Navbar />
            <SmoothScroll>
              <div className="relative z-10 flex flex-col min-h-screen bg-transparent">
                <div className="absolute top-0 left-0 w-full h-[100vh] bg-ld-grid z-[-1] pointer-events-none [mask-image:linear-gradient(to_bottom,black_50%,transparent_100%)]" />
                <main className="container mx-auto max-w-6xl pt-16 px-4 flex-grow">
                  {children}
                  <Analytics />
                </main>
                <Footer />
              </div>
            </SmoothScroll>
            <ChatWidget />
          </LocaleProvider>
        </Providers>
      </body>
    </html>
  );
}
